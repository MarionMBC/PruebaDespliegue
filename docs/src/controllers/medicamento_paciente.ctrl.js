/**
 * Autor: Jennebier Esther Alvarado López
 * 20191000717
 * Fecha: 22/03/2023
 */

import { pool } from "../../db/config.js";

/**
 * @author Jennebier Esther Alvarado López
 * @date 22/03/2023
 * @description Obtener la lista de medicamentos que toma un paciente dado el dni del paciente
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Json} El registro solicitado 
 */
export const getMedicamentoPaciente = async (req, res) => {
    try {
    const dni = req.params.dni_paciente; //el valor enviado através de la solicitud HTTP 
    const listado = await pool.query("SELECT med.name FROM medicamento_paciente med_pac INNER JOIN medicamento med ON med_pac.codigo_medicamento = med.codigo_medicamento WHERE dni_paciente = ?", [dni]);
    if (listado.length<=0){ //Verificación de que el objeto no venga vacío
        res.status(404).json({msg: "Medicamentos no encontrados"})
    }else{ //Si no viene vacío
        res.send(listado);
    }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al obtener el listado de medicamentos del paciente ${dni}. Error: ${error}`
        })
    }
};

/**
 * @author Jennebier Esther Alvarado López
 * @date 23/03/2023
 * @description Crear un registro en medicamento_paciente 
 * @param {Object} req Objeto de petición 
 * @param {Object} res Objeto de respuesta
 * @returns {Json} Si ocurre un error su respectivo mensaje de lo contrario se muestra un mensaje de que se ha agregado satisfactoriamente 
 */
export const createMedicamentoPaciente = async (req, res) => {
    try {
    const {
        dni_paciente,
        codigo_medicamento

    } = req.body;
    await pool.query(
        "INSERT INTO medicamento_paciente (dni_paciente, codigo_medicamento) VALUES (?, ?)",
        [
            dni_paciente,
            codigo_medicamento
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
 * @author Jennebier Esther Alvarado López
 * @date 23/03/2023
 * @description Actualizar un registro medicamento_paciente dado su dni_paciente y codigo_medicamento
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor
 * @returns {Json} Mensaje de proceso satisfactorio, caso contrario mensaje de error 
 */
export const updateMedicamentoPaciente = async (req, res) => {
    try {
    const dni  = req.params.dni_paciente;
    const cod = req.params.codigo_medicamento;
    const {
        dni_paciente,
        codigo_medicamento
    } = req.body;

//Con IFNULL() verificamos si el primer parametro es nulo, si lo es mantenemos el valor actual
    await pool.query(
        "UPDATE medicamento_paciente dni_paciente=IFNULL(?, dni_paciente), codigo_medicamento=IFNULL(?, codigo_medicamento) where dni_paciente = ? AND codigo_medicamento = ?",
        [
            dni,
            cod,
            dni_paciente,
            codigo_medicamento
        ]
    );
    const [respuesta] = await pool.query('SELECT * FROM medicamento_paciente WHERE dni_paciente= ? AND codigo_medicamento=?', [dni, cod]);
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
 * @author Jennebier Esther Alvarado López
 * @date 22/03/2023
 * @description Eliminar un registro de medicamento_paciente dado su dni_paciente y codigo_medicamento
 * @param {Object} req Petición al servidor
 * @param {Object} res Respuesta del servidor 
 * @returns {Json} mensaje de error caso contrario mensaje de proceso satisfactorio
 */
export const deleteMedicamentoPaciente = async (req, res) => {
    try {
        const dni = req.params.dni_paciente;
        const cod = req.params.codigo_medicamento;
        const [registro] = await pool.query("DELETE FROM medicamento_paciente WHERE dni_Paciente = ? AND codigo_medicamento = ?", [dni, cod]);
        if(registro.affectedRows == 0 ){ //Se verifica que hayan filas afectadas
            res.status(404).json({ msg: "No se encontró el registro" })
        }else{
            res.status(200).json({ok: true,msg: "El registro se ha eliminado correctamente."});
        }
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al eliminar el registro. Error: ${error}`
        })
    }
};