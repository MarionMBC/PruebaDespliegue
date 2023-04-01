/**
 * Autor: Incaivi Brandon Lazo Martinez
 * 20191001993
 * Fecha: 18/03/2023
 */

import { pool } from "../../db/config.js";

/**------------------------------------------------------------------------------------------------------- */

/**
 * Autor: Incaivi Brandon Lazo Martinez
 * Fecha: 18/03/2023
 * Obtener todas las especialidades con sus atributos
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Los registros completos de la tabla medico_especialidad
 */
export const getMedicos_Especialidades = async (req, res) =>{
    try{
        const [result] = await pool.query("SELECT * FROM medico_especialidad");
        return res.send(result);
    } 
    catch (error){
        console.log(error); 
        res.status(500);
        res.json({ msg: 'Error al obtener los registros de la tabla "medico_especialidad".' });
    }
};


/**------------------------------------------------------------------------------------------------------- */


/**
 * Autor: Incaivi Brandon Lazo Martinez
 * Fecha: 18/03/2023
 * Obtener una especialidad dado su nombre
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Json} El registro solicitado de la tabla medico_especialidad
 */
export const getMedico_Especialidad = async (req, res) => {
    try {
    const nombre = req.params.nombre_especialidad; //el valor enviado através de la solicitud HTTP 
    const [medico_especialidad] = await pool.query("SELECT * FROM medico_especialidad WHERE nombre_especialidad= ?", [nombre]);
    if (medico_especialidad.length<=0){ //--Verificación de que el objeto no venga vacío
        res.status(404).json({msg: "Especialidad no encontrada"})
    }else{ //--Si no viene vacío
        res.send(medico_especialidad[0]);
    }
    } catch (error) {
        return res.status(500).json({
            msg: `Ha ocurrido un error al obtener la especialidad. Error: ${error}`
        })
    }
};

/**----------------------------------------------------------------------------------------------------------- */

/**
 * Autor: Incaivi Brandon Lazo Martinez
 * Fecha: 18/03/2023
 * Crear una Especialidad 
 * @param {Object} req Objeto de petición 
 * @param {Object} res Objeto de respuesta
 * @returns {Json} Si ocurre un error su respectivo mensaje de lo contrario se muestra un mensaje de que se ha agregado correctamente
 */
export const createMedico_Especialidad = async (req, res) => {
    try {
    const {
       nombre_especialidad,
       dni_medico

    } = req.body;

    await pool.query(
        "INSERT INTO medico_especialidad (nombre_especialidad, dni_medico ) VALUES (?, ?)",
        [
           nombre_especialidad,
           dni_medico
        ]
    );

    res.send(`Especialidad del Médico: ${req.body} agregada exitósamente`);
    } catch (error) {
        return res.status(500).json({
            msg: `Ha ocurrido un error al crear la Especialidad. Error: ${error}`
        })
    }
};

/**------------------------------------------------------------------------------------------------------ */

/**
 * Autor: Incaivi Brandon Lazo Martinez
 * Fecha: 18/03/2023
 * Actualizar una especialidad dado su nombre, podrán actualizarse sus atributos menos su nombre
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor
 * @returns {Json} Mensaje de proceso satisfactorio, caso contrario mensaje de error 
 */
export const updateMedico_Especialidad = async (req, res) => {
    try {
    const nombre  = req.params.nombre_especialidad;
    const {
        dni_medico
    } = req.body;

    await pool.query(
        "UPDATE medico_especialidad dni_medico=IFNULL(?, dni_medico) where nombre_especialidad = ?",
        [
           dni_medico,
           nombre
        ]
    );

    const [respuesta] = await pool.query('SELECT * FROM medico_especialidad WHERE nombre_especialidad= ?', [nombre]);
    res.status(202).json({
        msg: `Datos de la especialidad del médico ${nombre} han sido actualizados: ${respuesta}}`
    });
    } catch (error) {
            return res.status(500).json({
                msg: `Ha ocurrido un error al actualizar la especialidad. Error: ${error}`
        })
    }
};

/**----------------------------------------------------------------------------------------------------- */

/**
 * Autor: Incaivi Brandon Lazo Martinez
 * Fecha: 18/03/2023
 * Eliminar una especialidad dado su nombre
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor 
 * @returns {Json} mensaje de error caso contrario mensaje de proceso satisfactorio
 */
export const deleteMedico_Especialidad = async (req, res) => {
    try {
        const nombre = req.params.nombre_especialidad;
        const [medico_especialidad] = await pool.query("DELETE FROM medico_especialidad WHERE nombre_especialidad=?", [nombre]);
        if(medico_especialidad.affectedRows == 0 ){ //--Se verifica que hayan filas afectadas
            res.status(404).json({ msg: "No se encontró la especialidad" })
        }else{
            res.status(200).json({ok: true,msg: "La especialidad se ha eliminado con éxito."});
        }
    } catch (error) {
        return res.status(500).json({
            msg: `Ha ocurrido un error al eliminar la especialidad ${nombre}. Error: ${error}`
        })
    }
};