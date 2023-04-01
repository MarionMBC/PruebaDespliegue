/** 
  Autor: Incaivi Brandon Lazo Martinez
  20191001993
  Fecha: 18/03/2023
 */

import { pool } from "../../db/config.js";


/**-------------------------------------------------------------------------------------------------------- */

/**
 * Autor: Incaivi Brandon Lazo Martinez
 * Fecha: 18/03/2023
 * Obtener  las cirugias con sus atributos
 * @param {Object} req --Objeto de petición
 * @param {Object} res --Objeto de respuesta
 * @returns {JSON}     --Los registros completos de la tabla cirugia
 */


export const getCirugias = async (req, res) =>{
    try{
        const [result] = await pool.query("SELECT * FROM cirugia");
        return res.send(result);
    } 

    catch (error){
        console.log(error); 
        res.status(500);
        res.json({ msg: 'Error al obtener los registros de la tabla "cirugia".' });
    }
};

/**------------------------------------------------------------------------------------------------------- */

/**
 * Autor: Incaivi Brandon Lazo Martinez
 * Fecha: 18/03/2023
 * Obtener una cirugia dado su codigo 
 * @param {Object} req --Objeto de petición
 * @param {Object} res --Objeto de respuesta
 * @returns {Json}     --El registro solicitado de la tabla cirugia
 */


export const getCirugia = async (req, res) => {
    try {
    const codigo = req.params.codigo_cirugia; //--el valor enviado através de la solicitud HTTP 
    const [cirugia] = await pool.query("SELECT * FROM cirugia WHERE codigo_cirugia= ?", [codigo]);
    if (cirugia.length<=0){ //--Verificación de que el objeto no venga vacío
        res.status(404).json({msg: "Cirugia no encontrada"})
    }else{ //--Si no viene vacío
        res.send(cirugia[0]);
    }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al obtener la cirugia. Error: ${error}`
        })
    }
};

/**--------------------------------------------------------------------------------------------------------- */

/**
 * Autor: Incaivi Brandon Lazo Martinez
 * Fecha: 18/03/2023
 * Crear una cirugia 
 * @param {Object} req Objeto de petición 
 * @param {Object} res Objeto de respuesta
 * @returns {Json} Si ocurre un error su respectivo mensaje de lo contrario se muestra un mensaje de que se ha agregado satisfactoriamente 
 */

export const createCirugia = async (req, res) => {
    try {
    const {
        codigo_cirugia,
        dni_paciente,
        nombre,
        tipo,
        motivo,
        tratamiento,
        observaciones

    } = req.body;
    await pool.query(
        "INSERT INTO cirugia (codigo_cirugia,dni_paciente,nombre,tipo,motivo,tratamiento,observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
        codigo_cirugia,
        dni_paciente,
        nombre,
        tipo,
        motivo,
        tratamiento,
        observaciones
        ]
    );

    res.send(`Cirugia: ${req.body} agregada exitosamente`);
} catch (error) {
    return res.status(500).json({
        msg: `Algo ha salido mal al crear la cirugia. Error: ${error}`
    })
}
};

/**------------------------------------------------------------------------------------------------------- */


/**
 * Autor: Incaivi Brandon Lazo Martinez
 * Fecha: 18/03/2023
 * Actualizar una cirugia dado su codigo, podrán actualizarse todos sus atributos menos su código
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor
 * @returns {Json} Mensaje de proceso satisfactorio, caso contrario mensaje de error 
 */
export const updateCirugia = async (req, res) => {
    try {
    const codigo  = req.params.codigo_cirugia;
    const {
        dni_paciente,
        nombre,
        tipo,
        motivo,
        tratamiento,
        observaciones
    } = req.body;

    
    await pool.query(
        "UPDATE Cirugia dni_paciente=IFNULL(?, dni_paciente),nombre=IFNULL(?, nombre),tipo=IFNULL(?, tipo), motivo=IFNULL(?, motivo), tratamiento=IFNULL(?, tratamiento), observaciones=IFNULL(?, observaciones)  where codigo_cirugia = ?",
        [
            dni_paciente,
            nombre,
            tipo,
            motivo,
            tratamiento,
            observaciones,
            codigo, 
        ]
    );

    const [respuesta] = await pool.query('SELECT * FROM cirugia WHERE codigo_cirugia= ?', [codigo]);
    res.status(202).json({
        msg: `Datos de la cirugia ${codigo} han sido actualizados: ${respuesta}}`
    });
    } catch (error) {
            return res.status(500).json({
                msg: `Algo ha salido mal al actualizar la cirugia. Error: ${error}`
        })
    }
};


/**------------------------------------------------------------------------------------------------------ */

/**
 * Autor: Incaivi Brandon Lazo Martinez
 * Fecha: 18/03/2023
 * Eliminar una cirugia dado su codigo
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor 
 * @returns {Json} mensaje de error caso contrario mensaje de proceso satisfactorio
 */
export const deleteCirugia = async (req, res) => {
    try {
        const codigo = req.params.codigo_cirugia;
        const [cirugia] = await pool.query("DELETE FROM cirugia WHERE codigo_cirugia=?", [codigo]);
        if(cirugia.affectedRows == 0 ){ //--Se verifica que hayan filas afectadas
            res.status(404).json({ msg: "No se encontró la cirugia" })
        }else{
            res.status(200).json({ok: true,msg: "Se ha eliminado correctamente la cirugia."});
        }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al eliminar la cirugia ${codigo}. Error: ${error}`
        })
    }
};