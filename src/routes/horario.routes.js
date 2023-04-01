/**
 * Autor: Jennebier Esther Alvarado López
 * 20191000717
 * Fecha: 25/03/2023
 */

import {Router} from 'express';
import { createHorario, getHorariosDisponibles, updateHorario } from '../controllers/horario.ctrl.js';

const router = Router();


router.get('/get/:dni_medico/:codigo_hospital/:fecha', getHorariosDisponibles);
router.post('/create', createHorario);
router.patch('/update/:codigo_horario/:dni_medico/:codigo_hospital', updateHorario);



export default router;
