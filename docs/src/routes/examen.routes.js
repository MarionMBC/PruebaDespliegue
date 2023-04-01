/* Autor: Rony Josue Gomez Oyuela
 * 20171004489
 * fecha: 20/03/2023
 */
import {Router} from 'express';
import { createExamen, deleteExamen, getExamen, getExamenes, updateExamen } from '../controllers/medico_especialidad.ctrl.js';


const router = Router();


router.get('/get', getExamenes);
router.get('/get/:codigo_examen', getExamen);
router.post('/create', createExamen);
router.patch('/update/:codigo_examen', updateExamen);
router.delete('/delete/:codigo_examen', deleteExamen);

export default router;