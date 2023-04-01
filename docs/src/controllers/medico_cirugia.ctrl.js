/**
 * Autor: Rony Josue Gomez Oyuela
 * 20171004489
 * fecha: 20/03/2023
 */

import { pool } from "../../db/config.js";

/**
 * @author Rony Josue Gomez Oyuela
 * @date 20/03/2023
 * @description Obtener el registro de la tabla Medico_cirugia del codigo ingresado
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Los atributos completos de un registro en relacion a un codigo_cirugia
 */
export const getMedicoCirugia = async (req, res) =>{
    try{
       const codigo =req.params.codigo_cirugia; 
       const cirugias = await pool.query("SELECT codigo_cirugia, a.dni_medico, primer_nombre ,primer_apellido, fecha from medico a inner join medico_cirugia b on a.dni_medico = b.dni_medico where codigo_cirugia=?", [codigo]);
       return res.send(cirugias); 
    } 
    catch (error){
        res.status(500);
        res.json({ msg: `Error al obtener los registros de la tabla "medico_cirugia". Error: ${error}` });
    }
};

/**
 * @author Rony Josue Gomez Oyuela
 * @date 24/03/2023 
 * @description Crear un registro en la tabla "medico_cirugia"
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Si ocurre un error se muestra respectivo mensaje de lo contrario se muestra un mensaje de que se ha agregado satisfactoriamente
 */

export const createMedicoCirugia = async (req, res) => {
    try {
    const {
        codigo_cirugia,
        dni_medico,
        fecha
    } = req.body;
    await pool.query(
        "INSERT INTO medico_cirugia (codigo_cirugia, dni_medico, fecha) VALUES (?, ?, ?)",
        [
            codigo_cirugia,
            dni_medico,
            fecha
        ]
    );
    res.send(`Registro: ${req.body} agregado exitosamente`);
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al crear el registro. Error: ${error}`
        })
    }
};

/**
 * @author Rony Josue Gomez Oyuela
 * @date 24/03/2023 
 * @description Actualizar un registro en la tabla "medico_cirugia" dado su codigo_cir y dni_medico
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {JSON} Si ocurre un error su respectivo mensaje de lo contrario se muestra un mensaje de que se ha agregado satisfactoriamente
 */

export const updateMedicoCirugia = async (req, res) => {
    try {
    const codigo  = req.params.codigo_cirugia;
    const dni = req.params.dni_medico;
    const fechac = req.params.fecha;
    const {
        codigo_cirugia,
        dni_medico,
        fecha
    } = req.body;

//Con IFNULL() verificamos si el primer parametro es nulo, si lo es mantenemos el valor actual
    await pool.query(
        "UPDATE medico_cirugia codigo_cirugia=IFNULL(?, codigo_cirugia), dni_medico=IFNULL(?, dni_medico), fecha=IFNULL(?, fecha) where codigo_cirugia = ?",
        [
            codigo,
            dni,
            fechac,
            codigo_cirugia,
            dni_medico,
            fecha
        ]
    );
    const [respuesta] = await pool.query('SELECT * FROM medico_cirugia WHERE codigo_cirugia= ? AND dni_medico=?', [codigo, dni]);
    res.status(202).json({
        msg: `Los datos han sido actualizados: ${respuesta}}`
    });
    } catch (error) {
            return res.status(500).json({
                msg: `Algo ha salido mal al actualizar el registro. Error: ${error}`
        })
    }
};


/**
 * @author Rony Josue Gomez Oyuela
 * @date 20/03/2023
 * @description Eliminar un registro de la tabla "medico_cirugia" dado su codigo_cirugia
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor 
 * @returns {Json} Mensaje de error caso contrario se envia mensaje de proceso satisfactorio
 */
export const deleteMedicoCirugia = async (req, res) => {
    try {
        const codigo = req.params.codigo_cirugia;
        const [medico_cirugia] = await pool.query("DELETE FROM medico_cirugia WHERE codigo_cirugia=?", [codigo]);
        if(medico_cirugia.affectedRows == 0 ){ 
            res.status(404).json({ msg: "No se encontró el registro a eliminar" })
        }else{
            res.status(200).json({ok: true,msg: "El registro se ha eliminado correctamente."});
        }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al eliminar el registro de la tabla medico_cirugia ${codigo}. Error: ${error}`
        })
    }
};
