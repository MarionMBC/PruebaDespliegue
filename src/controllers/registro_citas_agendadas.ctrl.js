/**
 * Autor: Jennebier Esther Alvarado López
 * 20191000717
 * Fecha: 27/03/2023
 */

import { pool } from "../../db/config.js";



/**
 * @author Jennebier Esther Alvarado López
 * @date 27/03/2023
 * @description Insertar un registro para gestionar el agendado de citas
 * @param {Object} req Objeto de petición 
 * @param {Object} res Objeto de respuesta
 * @returns {Json} Si ocurre un error su respectivo mensaje de lo contrario se muestra un mensaje de que se ha agregado satisfactoriamente 
 */
export const createRegistro = async (req, res) => {
    try {
    const {
        codigo_horario,
        codigo_cita,
        fecha_disponibilidad

    } = req.body;
    await pool.query(
        "INSERT INTO registro_citas_agendadas (codigo_horario, codigo_cita, fecha_disponibilidad) VALUES (?, ?, ?)",
        [
            codigo_horario,
            codigo_cita,
            fecha_disponibilidad
        ]
    );
    res.send(`Registro: ${req.body} agregado exitosamente`);
    } catch (error) {
        return res.status(500).json({
            msg: `Algo ha salido mal al crear el registro. Error: ${error}`
        })
    }
};
