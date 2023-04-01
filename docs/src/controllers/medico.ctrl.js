import { pool } from "../../db/config.js";


/**
 * Obtiene todos los registros de la tabla "medico" de la base de datos.
 * @author Marion Bustamante
 * @date Mar 11, 2023
 * @version 0.1
 * @async
 * @function
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @throws {Error} Si ocurre un error durante la ejecución de la función.
 * @returns {Promise<void>} Un objeto JSON con los registros obtenidos de la tabla "medico".
 */
export const getMedicos = async (req, res) => {
    try {
    const [result] = await pool.query("Select * from healthfiles.medico");
    return res.send(result);
    } catch (error) {
    console.log(error);
    return res
        .status(500)
        .json({ msg: 'Error al obtener los registros de la tabla "medico".' });
    }
};

/**
Obtiene los detalles de un médico por su número de identificación.
@author Marion Bustamante
@date Mar 11, 2023
@version 0.1
@summary Obtiene los detalles de un médico por su número de identificación.
@function getMedico
@async
@param {Object} req - La solicitud HTTP recibida.
@param {Object} res - La respuesta HTTP que se enviará.
@param {string} req.params.dni_Medico - El número de identificación del médico que se está buscando.
@throws {Error} Si hay un error al ejecutar la consulta.
@returns {Promise<void>} Una promesa que se resuelve cuando se completa la operación.
*/
export const getMedico = async (req, res) => {
    try {
    const dni = req.params.dni_Medico;
    const [medico] = await pool.query(
        "SELECT * FROM medico WHERE dni_Medico= ?",
        [dni]
    );
    medico.length <= 0
        ? res.status(404).json({ msg: "No se encontró el médico" })
        : res.send(medico[0]);
    } catch (error) {
        return res.status(500).json({
            msg: "Algo ha salido mal al obtener el médico."
        })
    }
};


/**
 * Crea un nuevo registro de médico en la base de datos.
 * @author Marion Bustamante
 * @date Mar 11, 2023
 * @version 0.1
 * @async
 * @function createMedico
 * @param {Object} req - La solicitud HTTP recibida.
 * @param {Object} res - La respuesta HTTP que se enviará.
 * @throws {Error} Si hay un error al ejecutar la consulta.
 * @returns {Promise<void>} Una promesa que se resuelve cuando se completa la operación.
 */
export const createMedico = async (req, res) => {
    try {
    const {
        dni_medico,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        genero,
        fecha_nacimiento,
        telefono,
        correo_electronico,
        contraseña,
        foto_perfil
    } = req.body;
    const medico = await pool.query(
        "INSERT INTO MEDICO (dni_medico, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, genero, fecha_nacimiento, telefono, correo_electronico, contraseña, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            dni_medico,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            genero,
            fecha_nacimiento,
            telefono,
            correo_electronico,
            contraseña,
            foto_perfil
        ]
    );
    res.send(req.body);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo ha salido mal al crear el médico."
        })
    }
};


/**
 Actualiza el registro de un médico en la base de datos.
@author Marion Bustamante
@date Mar 11, 2023
@version 0.1
@summary Esta función recibe una solicitud HTTP para actualizar un registro de médico en la base de datos. Los nuevos datos se envían en el cuerpo de la solicitud y el ID del médico se toma de los parámetros de la solicitud.
@function updateMedico
@async
@param {Object} req - La solicitud HTTP recibida.
@param {Object} res - La respuesta HTTP que se enviará.
@throws {Error} Si hay un error al ejecutar la consulta.
@returns {Promise<void>} Una promesa que se resuelve cuando se completa la operación. 
 */
export const updateMedico = async (req, res) => {
    try {
    const dni_Medico_Req  = req.params.dni_medico;
    const {
        dni_medico,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            genero,
            fecha_nacimiento,
            telefono,
            correo_electronico,
            contraseña,
            foto_perfil
    } = req.body;

    const medico = await pool.query(
        "UPDATE medico set primer_Nombre=IFNULL(?, primer_Nombre),segundo_Nombre=IFNULL(?, segundo_Nombre),primer_Apellido=IFNULL(?, primer_Apellido), segundo_Apellido=IFNULL(?, segundo_Apellido), genero=IFNULL(?, genero), fecha_Nacimiento=IFNULL(?, fecha_Nacimiento), telefono=IFNULL(?, telefono), correo_Electronico=IFNULL(?, correo_Electronico), contraseña=IFNULL(?, contraseña), foto_perfil=IFNULL(?, foto_perfil) where dni_Medico = ?",
        [
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            genero,
            fecha_nacimiento,
            telefono,
            correo_electronico,
            contraseña,
            foto_perfil,
        dni_Medico_Req,
        ]
    );

    const [respuesta] = await pool.query ('select * from medico where dni_Medico= ?', [dni_Medico_Req]);
    (respuesta.length == 0) ? res.status(400).json({
        msg: "El médico no existe"
    })
    : 
    res.status(200).send(
        respuesta[0]
    );

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo ha salido mal al obtener el médico."
        })
    }
    };

/**
Elimina un médico de la base de datos por su dni
@author Marion Bustamante
@date Mar 11, 2023
@version 0.1
@async
@function deleteMedico
@param {Object} req - Objeto de solicitud HTTP
@param {Object} res - Objeto de respuesta HTTP
@throws {Error} Si se produce un error al eliminar al médico
@returns {Promise<void>} Una promesa que se resuelve cuando se completa la operación.
*/
export const deleteMedico = async (req, res) => {
    try {
        const dni_Medico = req.params.dni_Medico;
        const [medico] = await pool.query("DELETE FROM MEDICO WHERE dni_Medico=?", [dni_Medico]);
        medico.affectedRows == 0 ? res.status(404).json({ msg: "No se encontró el médico" }):res.status(200).json({ok: true,msg: "El médico se ha eliminado correctamente.",});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo ha salido mal al eliminar el médico."
        })
    }
};
