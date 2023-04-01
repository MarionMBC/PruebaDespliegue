/**
 * Autor: Jennebier Esther Alvarado López
 * 20191000717
 * Fecha: 16/03/2023
 */

import { pool } from "../../db/config.js";

/**
 * @author Jennebier Esther Alvarado López
 * @date 16/03/2023
 * @description Obtener todos los pacientes con sus atributos
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Los registros completos de la tabla paciente
 */
export const getPacientes = async (req, res) =>{
    try{
        const result = await pool.query("SELECT * FROM paciente");
        return res.send(result);
    } 
    catch (error){
        console.log(error); 
        res.status(500);
        res.json({ msg: 'Error al obtener los registros de la tabla "paciente".' });
    }
};


/**
 * @author Jennebier Esther Alvarado López
 * @date 17/03/2023
 * @description Obtener un paciente dado su dni 
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Json} El registro solicitado de la tabla paciente
 */
export const getPaciente = async (req, res) => {
    try {
    const dni = req.params.dni_paciente; //el valor enviado através de la solicitud HTTP 
    const [paciente] = await pool.query("SELECT * FROM paciente WHERE dni_paciente= ?", [dni]);
    if (paciente.length<=0){ //Verificación de que el objeto no venga vacío
        res.status(404).json({msg: "Paciente no encontrado"})
    }else{ //Si no viene vacío
        res.send(paciente[0]);
    }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al obtener el paciente. Error: ${error}`
        })
    }
};


/**
 * @author Jennebier Esther Alvarado López
 * @date 17/03/2023
 * @description Crear un paciente 
 * @param {Object} req Objeto de petición 
 * @param {Object} res Objeto de respuesta
 * @returns {Json} Si ocurre un error su respectivo mensaje de lo contrario se muestra un mensaje de que se ha agregado satisfactoriamente 
 */
export const createPaciente = async (req, res) => {
    try {
    const {
        dni_paciente,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        genero,
        fecha_nacimiento,
        telefono,
        correo_electronico,
        contrasena,
        pin,
        img_perfil,
        peso,
        altura,
        tipo_sangre,
        nombre_contacto_emergencia,
        telefono_contacto_emergencia

    } = req.body;
    await pool.query(
        "INSERT INTO paciente (dni_paciente, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, genero, fecha_nacimiento, telefono, correo_electronico, contrasena, pin, img_perfil, peso, altura, tipo_sangre, nombre_contacto_emergencia, telefono_contacto_emergencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            dni_paciente,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            genero,
            fecha_nacimiento,
            telefono,
            correo_electronico,
            contrasena,
            pin,
            img_perfil,
            peso,
            altura,
            tipo_sangre,
            nombre_contacto_emergencia,
            telefono_contacto_emergencia
        ]
    );
    res.send(`Paciente: ${req.body} agregado exitosamente`);
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al crear el paciente. Error: ${error}`
        })
    }
};



/**
 * @author Jennebier Esther Alvarado López
 * @date 17/03/2023
 * @description Actualizar un paciente dado su dni, podrán actualizarse todos sus atributos menos su dni
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor
 * @returns {Json} Mensaje de proceso satisfactorio, caso contrario mensaje de error 
 */
export const updatePaciente = async (req, res) => {
    try {
    const dni  = req.params.dni_paciente;
    const {
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        genero,
        fecha_nacimiento,
        telefono,
        correo_electronico,
        contrasena,
        pin,
        img_perfil,
        peso,
        altura,
        tipo_sangre,
        nombre_contacto_emergencia,
        telefono_contacto_emergencia
    } = req.body;

//Con IFNULL() verificamos si el primer parametro es nulo, si lo es mantenemos el valor actual
    await pool.query(
        "UPDATE paciente primer_nombre=IFNULL(?, primer_nombre),segundo_nombre=IFNULL(?, segundo_nombre),primer_apellido=IFNULL(?, primer_apellido), segundo_apellido=IFNULL(?, segundo_Apellido), genero=IFNULL(?, genero), fecha_nacimiento=IFNULL(?, fecha_Nacimiento), telefono=IFNULL(?, telefono), correo_electronico=IFNULL(?, correo_electronico), contrasena=IFNULL(?, contrasena), pin=IFNULL(?, pin), img_perfil=IFNULL(?, foto_perfil), peso=IFNULL(?, peso), altura=IFNULL(?, tipo_sangre), nombre_contacto_emergencia=IFNULL(?, nombre_contacto_emergencia), telefono_contacto_emergencia=IFNULL(?, telefono_contacto_emergencia) where dni_paciente = ?",
        [
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            genero,
            fecha_nacimiento,
            telefono,
            correo_electronico,
            contrasena,
            pin,
            img_perfil,
            peso,
            altura,
            tipo_sangre,
            nombre_contacto_emergencia,
            telefono_contacto_emergencia,
            dni,
        ]
    );
    const [respuesta] = await pool.query('SELECT * FROM paciente WHERE dni_paciente= ?', [dni]);
    res.status(202).json({
        msg: `Datos del paciente ${dni} han sido actualizados: ${respuesta}}`
    });
    } catch (error) {
            return res.status(500).json({
                msg: `Algo ha salido mal al actualizar el paciente. Error: ${error}`
        })
    }
};



/**
 * @author Jennebier Esther Alvarado López
 * @date 17/03/2023
 * @description Eliminar un paciente dado su dni
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor 
 * @returns {Json} mensaje de error caso contrario mensaje de proceso satisfactorio
 */
export const deletePaciente = async (req, res) => {
    try {
        const dni = req.params.dni_paciente;
        const [paciente] = await pool.query("DELETE FROM paciente WHERE dni_Paciente=?", [dni]);
        if(paciente.affectedRows == 0 ){ //Se verifica que hayan filas afectadas
            res.status(404).json({ msg: "No se encontró el paciente" })
        }else{
            res.status(200).json({ok: true,msg: "El paciente se ha eliminado correctamente."});
        }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al eliminar el paciente ${dni}. Error: ${error}`
        })
    }
};