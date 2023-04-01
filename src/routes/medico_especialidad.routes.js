/**
 * Autor: Incaivi Brandon Lazo Martinez
 * 20191001993
 * Fecha: 18/03/2023
 */

import {Router} from 'express';
import { createMedico_Especialidad, deleteMedico_Especialidad, getMedico_Especialidad, getMedicos_Especialidades, updateMedico_Especialidad } from '../controllers/medico_especialidad.ctrl.js';

const router = Router();

router.get('/get', getMedicos_Especialidades);
router.get('/get/:nombre_especialidad', getMedico_Especialidad);
router.post('/create', createMedico_Especialidad);
router.patch('/update/:nombre_especialidad', updateMedico_Especialidad);
router.delete('/delete/:nombre_especialidad', deleteMedico_Especialidad);


export default router;