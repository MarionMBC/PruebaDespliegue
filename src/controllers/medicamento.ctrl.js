import {pool} from '../../db/config.js';


/**
 * @author Marion Bustamante
 * @version 1.1
 * @date 18 de marzo de 2023
 *
 * Obtiene la información de un medicamento por código.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 *
 * @returns {Object} Información del medicamento o un mensaje de error si no se encuentra.
 */
export const getMedicamento = async (req, res) => {
    try {
        const codigo_medicamento = req.params.codigo_medicamento;
        const [medicamento] = await pool.query("Select * from healthfiles.medicamento where codigo_medicamento=?", [codigo_medicamento]);
        medicamento.length == 0 ?
            res.status(400).send("El medicamento no existe.") :
            res.status(400).send(medicamento[0]);
    } catch (error) {
        res.status(400).send(
            error
        )
    }
}

/**
 * @Author: Marion Bustamante
 * @Date: 2023-03-18
 * @Version: 1.0
 *
 * Obtiene todos los medicamentos de la tabla medicamento en la base de datos HealthFiles
 *
 * @param {object} req - El objeto de solicitud HTTP
 * @param {object} res - El objeto de respuesta HTTP
 * @returns {object} Retorna un objeto con el resultado de la consulta
 */
export const getMedicamentos = async (req, res) => {
    try {
        const [result] = await pool.query("Select * from healthfiles.medicamento");
        return res.send(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: 'No se encontró la información'
        })
    }
}

/**
 @autor Marion Bustamante
 @date 2023-03-18
 @version 1.1
 @description Agrega un medicamento a la base de datos.
 @param {Object} req - Objeto que contiene la petición HTTP.
 @param {Object} res - Objeto que contiene la respuesta HTTP.
 @returns {Object} - Objeto JSON que indica si se agregó correctamente el medicamento.
 @throws {Object} - Objeto JSON que indica si ocurrió un error al agregar el medicamento.
 */

export const createMedicamento = async (req, res) => {
    console.log('He');
    try {
        const {
            codigo_medicamento,
            dni_medico,
            nombre,
            estado,
            nivel_importancia,
            fecha_inicial,
            fecha_final,
            cantidad_principio_act,
            cantidad_tomar,
            frecuencia
        } = req.body;
        const medicamento = await pool.query(
            "INSERT INTO healthfiles.medicamento (codigo_medicamento, dni_medico, nombre, estado, nivel_importancia, fecha_inicial, fecha_final, cantidad_principio_act, cantidad_tomar, frecuencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                codigo_medicamento,
                dni_medico,
                nombre,
                estado,
                nivel_importancia,
                fecha_inicial,
                fecha_final,
                cantidad_principio_act,
                cantidad_tomar,
                frecuencia
            ]
        );
        console.log(medicamento);
        return res.status(200).json({
            msg: "Medicamento agregado correctamente."
        });
    } catch (error) {
        console.log(error.sqlMessage);
        const {code, sqlState, errno, sqlMessage} = error
        res.status(400).json({
            "Error": code,
            "Número de error": errno,
            "Estado de la consulta SQL": sqlState,
            "Descripción de error": sqlMessage
        })
    }
}

/**

 @Author: Marion Bustamante
 @Date: 2023-03-18
 @Version: 1.0
 @param {object} req - Objeto de solicitud HTTP.
 @param {object} res - Objeto de respuesta HTTP.
 @returns {object} - Objeto de respuesta HTTP con los detalles del medicamento actualizado.
 @description Actualiza un medicamento existente en la base de datos.
 */
export const updateMedicamento = async (req, res) => {
    try {
        const codigo_medicamento_req = req.params.codigo_medicamento;
        const {
            dni_medico,
            nombre,
            estado,
            nivel_importancia,
            fecha_inicial,
            fecha_final,
            cantidad_principio_act,
            cantidad_tomar,
            frecuencia
        } = req.body;
        const [medicamento] = await pool.query("Update medicamento set dni_medico = IFNULL(?, dni_medico ), nombre= IFNULL(?, nombre), estado=IFNULL(?, estado), nivel_importancia = IFNULL(?, nivel_importancia), fecha_inicial = IFNULL(?, fecha_inicial), fecha_final = IFNULL(?, fecha_final), cantidad_principio_act = IFNULL(?, cantidad_principio_act), cantidad_tomar = IFNULL(?, cantidad_tomar), frecuencia = IFNULL(?, frecuencia)  where codigo_medicamento = ?",
            [
                dni_medico,
                nombre,
                estado,
                nivel_importancia,
                fecha_inicial,
                fecha_final,
                cantidad_principio_act,
                cantidad_tomar,
                frecuencia,
                codigo_medicamento_req
            ]);
        if (medicamento.affectedRows === 0) {
            res.status(400).send(
                "El medicamento no existe."
            )
        } else {
            const [result] = await pool.query("Select * from medicamento where codigo_medicamento= ?", [req.params.codigo_medicamento]);
            res.status(200).send(result[0]);
        }
    } catch (error) {
        return res.status(400).json(
            error
        )

    }
}

/**

 @Author: Marion Bustamante
 @Date: 2023-03-18
 @Version: 1.0
 @param {object} req - Objeto de solicitud HTTP.
 @param {object} res - Objeto de respuesta HTTP.
 @returns {object} - Objeto de respuesta HTTP con los detalles del medicamento eliminado.
 @description Elimina un medicamento existente de la base de datos.
 */
export const deleteMedicamento = async (req, res) => {
    try {
        const codigo_medicamento = req.params.codigo_medicamento;
        const [result] = await pool.query("Select * from healthfiles.medicamento where codigo_medicamento= ?", [codigo_medicamento]);
        const [medicamento] = await pool.query("Delete from healthfiles.medicamento where codigo_medicamento = ?", [codigo_medicamento]);
        if (medicamento.affectedRows == 0) {
            res.status(200).send("El medicamento no existe");
        } else {
            res.status(400).send(result[0]);
        }
    } catch (error) {
        res.status(200).send(error)
    }
}


export const logMedicamento = async () => {
    try {
        return;
    } catch (error) {

    }
}




