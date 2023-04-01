/**
 * Autor: Jennebier Esther Alvarado López
 * 20191000717
 * Fecha: 19/03/2023
 */

import { pool } from "../../db/config.js";

/**
 * @author Jennebier Esther Alvarado López
 * @date 19/03/2023
 * @description Obtener todas las citas dado un dni_paciente
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Los registros completos 
 */
export const getCitasPaciente = async (req, res) =>{
    try{
       const dni =req.params.dni_paciente; //Guardo el dni_paciente enviado através de la URL
       const citas = await pool.query("SELECT * FROM cita WHERE dni_paciente =?", [dni]);
       return res.send(citas); //Envío todas las citas del paciente especificado 
    } 
    catch (error){
        res.status(500);
        res.json({ msg: `Error al obtener los registros de la tabla "citas". Error: ${error}` });
    }
};

/**
 * @author Jennebier Esther Alvarado López
 * @date 19/03/2023
 * @description Obtener todas las citas dado un dni_paciente y una fecha
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Los registros completos 
 */
export const getCitasPacienteFecha = async (req, res) =>{
    try{
       const dni =req.params.dni_paciente; //Guardo el dni_paciente enviado através de la URL
       const fecha = req.params.fecha; //Guardar la fecha enviada en la URL
       const citas = await pool.query("SELECT * FROM cita WHERE dni_paciente =? AND fecha = ?", [dni, fecha]);
       return res.send(citas); //Envío todas las citas del paciente especificado 
    } 
    catch (error){
        res.status(500);
        res.json({ msg: `Error al obtener los registros de la tabla "citas". Error: ${error}` });
    }
};

/**
 * @author Jennebier Esther Alvarado López
 * @date 19/03/2023
 * @description Obtener todas las citas de un día en específico dado un dni_medico
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Los registros completos de la tabla paciente
 */
export const getCitasMedicoFecha = async (req, res) =>{
    try{
       const dni = req.params.dni_medico; //Guardar el dni_paciente enviado através de la URL
       const fecha = req.params.fecha; //Guardar la fecha enviada a través de la URL  
       const citas = await pool.query("SELECT * FROM cita WHERE dni_medico =? AND fecha = ?", [dni, fecha]);
       return res.send(citas); //Envío todas las citas del médico especificado en la fecha especificada(preferencia: fecha actual)
    } 
    catch (error){
        res.status(500);
        res.json({ msg: `Error al obtener los registros de la tabla "citas". Error: ${error}` });
    }
};


/**
 * @author Jennebier Esther Alvarado López
 * @date 19/03/2023
 * @description Obtener una cita dado su código 
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Json} El registro solicitado de la tabla cita dado su código
 */
export const getCita = async (req, res) => {
    try {
    const codigo = req.params.codigo; //el valor enviado através de la solicitud HTTP 
    const [cita] = await pool.query("SELECT * FROM cita WHERE codigo_cita= ?", [codigo]);
    if (cita.length<=0){ //Verificación de que el objeto no venga vacío
        res.status(404).json({msg: "Cita no encontrada"})
    }else{ //Si no viene vacío
        res.send(cita[0]);
    }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al obtener el registro de la cita. Error: ${error}`
        })
    }
};


/**
 * @author Jennebier Esther Alvarado López
 * @date 19/03/2023
 * @description Crear una cita
 * @param {Object} req Objeto de petición 
 * @param {Object} res Objeto de respuesta
 * @returns {Json} Si ocurre un error su respectivo mensaje de lo contrario se muestra un mensaje de que se ha agregado satisfactoriamente 
 */
export const createCita = async (req, res) => {
    try {
    const {
        codigo_cita,
        dni_paciente,
        dni_medico,
        codigo_hospital,
        fecha,
        hora,
        razon,
        estado,
        diagnostico,
        tratamiento,
        valoracion

    } = req.body;
    await pool.query(
        "INSERT INTO cita (codigo_cita, dni_paciente, dni_medico, codigo_hospital, fecha, hora, razon, estado, diagnostico, tratamiento, valoracion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            codigo_cita,
            dni_paciente,
            dni_medico,
            codigo_hospital,
            fecha,
            hora,
            razon,
            estado,
            diagnostico,
            tratamiento,
            valoracion
        ]
    );
    res.send(`Cita: ${req.body} agregada exitosamente`);
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al crear la cita. Error: ${error}`
        })
    }
};



/**
 * @author Jennebier Esther Alvarado López
 * @date 19/03/2023
 * @description Actualizar una cita dado su codigo, podrán actualizarse todos sus atributos menos su codigo
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor
 * @returns {Json} Mensaje de proceso satisfactorio, caso contrario mensaje de error 
 */
export const updateCita = async (req, res) => {
    try {
    const codigo  = req.params.codigo_cita;
    const {
        dni_paciente,
        dni_medico,
        codigo_hospital,
        fecha,
        hora,
        razon,
        estado,
        diagnostico,
        tratamiento,
        valoracion
    } = req.body;

//Con IFNULL() verificamos si el primer parametro es nulo, si lo es mantenemos el valor actual
    await pool.query(
        "UPDATE cita dni_paciente=IFNULL(?, dni_paciente),dni_medico=IFNULL(?, dni_medico),codigo_hospital=IFNULL(?, codigo_hospital), fecha=IFNULL(?, fecha), hora=IFNULL(?, hora), razon=IFNULL(?, razon), estado = IFNULL(?, estado), diagnostico=IFNULL(?, diagnostico), tratamiento=IFNULL(?, tratamiento), valoracion=IFNULL(?, valoracion) where codigo_cita = ?",
        [
            dni_paciente,
            dni_medico,
            codigo_hospital,
            fecha,
            hora,
            razon,
            estado,
            diagnostico,
            tratamiento,
            valoracion,
            codigo
        ]
    );
    const [respuesta] = await pool.query('SELECT * FROM cita WHERE codigo_cita= ?', [codigo]);
    res.status(202).json({
        msg: `Registro de la cita ${codigo} han sido actualizados: ${respuesta}}`
    });
    } catch (error) {
            return res.status(500).json({
                msg: `Algo ha salido mal al actualizar el registro de la cita. Error: ${error}`
        })
    }
};

/*
 * @author Jennebier Esther Alvarado López
 * @date 19/03/2023
 * @description Eliminar una cita dado su codigo
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor 
 * @returns {Json} mensaje de error caso contrario mensaje de proceso satisfactorio
 */
export const deleteCita = async (req, res) => {
    try {
        const codigo = req.params.codigo_cita;
        const [cita] = await pool.query("DELETE FROM cita WHERE codigo_cita=?", [codigo]);
        if(cita.affectedRows == 0 ){ //Se verifica que hayan filas afectadas
            res.status(404).json({ msg: "No se encontró la cita a eliminar" })
        }else{
            res.status(200).json({ok: true,msg: "La cita se ha eliminado correctamente."});
        }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al eliminar el registro de la cita ${codigo}. Error: ${error}`
        })
    }
};