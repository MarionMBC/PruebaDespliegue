/**
 * Autor: Rony Josue Gomez Oyuela
 * 20171004489
 * fecha: 22/03/2023
 */
import { pool } from "../../db/config.js";

/**
 * @author Rony Josue Gomez Oyuela
 * @date 22/03/2023
 * @description Obtener todos los examenes con sus atributos
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Los Registros completos de la tabla examen 
 */
export const getExamenes = async (req, res) =>{
    try{
       const result = await pool.query("SELECT * FROM examen");
       return res.send(result); 
    } 
    catch (error){
        res.status(500);
        res.json({ msg: `Error al obtener los registros de la tabla "examen". Error: ${error}` });
    }
};


/**
 * @author Rony Josue Gomez Oyuela
 * @date 22/03/2023
 * @description Obtener todos los atributos del examen por el codigo_examen ingresado 
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Los Registros completos de la tabla examen por codigo_examen ingresado
 */

export const getExamen = async (req, res) => {
    try {
    const codigo = req.params.codigo_examen; //el valor enviado através de la solicitud HTTP 
    const [examen] = await pool.query("SELECT * FROM examen WHERE codigo_examen=?", [codigo]);
    if (examen.length<=0){ //Verificación de que el objeto no venga vacío
        res.status(404).json({msg: "Examen no encontrado"})
    }else{ //Si no viene vacío
        res.send(examen[0]);
    }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al obtener el examen. Error: ${error}`
        })
    }
};

/**
 * @author Rony Josue Gomez Oyuela
 * @date 22/03/2023
 * @description Crear un Examen
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Si ocurre un error su respectivo mensaje de lo contrario se muestra un mensaje de que se ha agregado satisfactoriamente
 */

export const createExamen = async (req, res) => {
    try {
    const {
        codigo_examen,
        dni_paciente,
        dni_medico,
        nombre,
        importancia,
        tipo,
        fecha,
        imagen,

    } = req.body;
    await pool.query(
        "INSERT INTO examen (codigo_examen, dni_paciente, dni_medico, nombre, importancia, tipo, fecha, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
            codigo_examen,
            dni_paciente,
            dni_medico,
            nombre,
            importancia,
            tipo,
            fecha,
            imagen,
        ]
    );
    res.send(`Examen: ${req.body} agregado exitosamente`);
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al crear el examen. Error: ${error}`
        })
    }
};


/**
 * @author Rony Josue Gomez Oyuela
 * @date 22/03/2023
 * @description Actualizar un examen dado su codigo, podrán actualizarse todos sus atributos menos su codigo
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor
 * @returns {Json} Mensaje de proceso satisfactorio, caso contrario mensaje de error 
 */
export const updateExamen = async (req, res) => {
    try {
    const codigo = req.params.codigo_examen;
    const {
        codigo_examen,
        dni_paciente,
        dni_medico,
        nombre,
        importancia,
        tipo,
        fecha,
        imagen,
    } = req.body;

    //Con IFNULL() verificamos si el primer parametro es nulo, si lo es mantenemos el valor actual
    await pool.query(
        "UPDATE examen dni_paciente=IFNULL(?, dni_paciente), dni_medico=IFNULL(?, dni_medico),nombre=IFNULL(?, nombre), importancia=IFNULL(?, importancia), tipo=IFNULL(?, tipo), fecha=IFNULL(?, fecha), imagen=IFNULL(?, imagen)",
        [
            codigo_examen,
            dni_paciente,
            dni_medico,
            nombre,
            importancia,
            tipo,
            fecha,
            imagen,
        ]
    );
    const [respuesta] = await pool.query('SELECT * FROM examen WHERE codigo_examen= ?', [codigo]);
    res.status(202).json({
        msg: `Los datos del examen ${codigo} han sido actualizados: ${respuesta}}`
    });
    } catch (error) {
            return res.status(500).json({
                msg: `Algo ha salido mal al actualizar el examen. Error: ${error}`
        })
    }
};


/**
 * @author Rony Josue Gomez Oyuela
 * @date 22/03/2023
 * @description Eliminar un examen dado su codigo
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor 
 * @returns {Json} Mensaje de error caso contrario mensaje de proceso satisfactorio
 */
export const deleteExamen = async (req, res) => {
    try {
        const codigo = req.params.codigo_examen;
        const [examen] = await pool.query("DELETE FROM examen WHERE codigo_examen=?", [codigo]);
        if(examen.affectedRows == 0 ){ //Se verifica que hayan filas afectadas
            res.status(404).json({ msg: "No se encontró el examen" })
        }else{
            res.status(200).json({ok: true,msg: "El examen se ha eliminado correctamente."});
        }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al eliminar el examen ${codigo}. Error: ${error}`
        })
    }
};



