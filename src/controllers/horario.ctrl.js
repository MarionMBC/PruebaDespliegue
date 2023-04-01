/**
 * Autor: Jennebier Esther Alvarado López
 * 20191000717
 * Fecha: 25/03/2023
 */

import { pool } from "../../db/config.js";

/**
 * @author Jennebier Esther Alvarado López
 * @date 25/03/2023
 * @description Obtener todos los horarios disponibles dado un dni_medico, codigo_hospital y fecha
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Los registros completos 
 */
export const getHorariosDisponibles = async (req, res) =>{
    try{
       const dni = req.params.dni_medico; //Guardo el dni_medico enviado através de la URL
       const cod = req.params.codigo_hospital; //Guardo el código del hospital 
       const fecha = req.params.fecha;
       const horarios = await pool.query(
        "SELECT hor.hora_inicio, hor.hora_final FROM horario hor INNER JOIN registro_citas_agendadas reg ON reg.codigo_horario = hor.codigo_horario WHERE hor.dni_medico =? AND hor.codigo_hospital = ? AND reg.fecha_disponibilidad = ? AND hor.dia_de_semana = DAYNAME(?) AND reg.codigo_cita IS NULL", [dni, cod, fecha, fecha]
        );
       return res.send(horarios); //Envío todas las citas del paciente especificado 
    } 
    catch (error){
        res.status(500);
        res.json({ msg: `Error al obtener los horarios disponibles de la tabla "horarios". Error: ${error}`});
    }
};


/**
 * @author Jennebier Esther Alvarado López
 * @date 25/03/2023
 * @description Registrar un horario de atención sin permitir solapamientos
 * @param {Object} req Objeto de petición 
 * @param {Object} res Objeto de respuesta
 * @returns {Json} Si ocurre un error su respectivo mensaje de lo contrario se muestra un mensaje de que se ha agregado satisfactoriamente 
 */
export const createHorario = async (req, res) => {
    try {
    const {
        codigo_horario,
        dni_medico,
        codigo_hospital,
        dia_de_semana,
        hora_inicio,
        hora_final,
        vigencia
    } = req.body;
    var horariosPrevios = await pool.query("SELECT COUNT(*) FROM horario WHERE dni_medico = ? AND horario.dia_de_semana = DAYNAME(?) AND (horario.hora_inicio < ? AND horario.hora_final > ?) OR (horario.hora_inicio < ? AND horario.hora_final > ?) OR (horario.hora_inicio >= ? AND horario.hora_final <= ?)", [dni, fecha, hora_inicio, hora_inicio, hora_final, hora_final, hora_inicio, hora_final]);

    if(horariosPrevios==0){
        await pool.query(
            "INSERT INTO horario (codigo_horario, dni_medico, codigo_hospital, dia_de_semana, hora_inicio, hora_final, vigencia) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                codigo_horario,
                dni_medico,
                codigo_hospital,
                dia_de_semana,
                hora_inicio,
                hora_final,
                vigencia
            ]
        );
        res.send(`Horario: ${req.body} agregado exitosamente`);
    }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al crear el horario, probablemente este se solape con uno previo. Error: ${error}`
        })
    }
};



/**
 * @author Jennebier Esther Alvarado López
 * @date 25/03/2023
 * @description Actualizar un horario dado su codigo_horario, dni_medico y codigo_hospital
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor
 * @returns {Json} Mensaje de proceso satisfactorio, caso contrario mensaje de error 
 */
export const updateHorario = async (req, res) => {
    try {
    const codigo_hor  = req.params.codigo_horario;
    const dni = req.params.dni_medico;
    const codigoHospi = req.params.codigo_hospital;
    const {
        codigo_hospital,
        dia_de_semana,
        hora_inicio,
        hora_final,
        vigencia
    } = req.body;

//Con IFNULL() verificamos si el primer parametro es nulo, si lo es mantenemos el valor actual
    const respuesta = await pool.query(
        "UPDATE horario codigo_hospital=IFNULL(?, codigo_hospital), dia_de_semana=IFNULL(?, dia_de_semana), hora_inicio=IFNULL(?, hora_inicio), hora_final=IFNULL(?, hora_final), vigencia=IFNULL(?, vigencia) where codigo_horario = ? AND dni_medico=? AND codigo_hospital=?",
        [
            codigo_hospital,
            dia_de_semana,
            hora_inicio,
            hora_final,
            vigencia,
            codigo_hor,
            dni,
            codigoHospi
        ]
    );
    res.status(202).json({
        msg: `Registro de horario ${codigo_hor} ha sido actualizado: ${respuesta}}`
    });
    } catch (error) {
            return res.status(500).json({
                msg: `Algo ha salido mal al actualizar el registro del horario. Error: ${error}`
        })
    }
};