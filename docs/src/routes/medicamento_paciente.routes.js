/**
 * Autor: Jennebier Esther Alvarado López
 * 20191000717
 * Fecha: 22/03/2023
 */

import {Router} from 'express';
import { createMedicamentoPaciente, deleteMedicamentoPaciente, getMedicamentoPaciente, updateMedicamentoPaciente } from '../controllers/medicamento_paciente.ctrl';

const router = Router();

router.get('/get/:dni_paciente', getMedicamentoPaciente);
router.post('/create', createMedicamentoPaciente);
router.patch('/update/:dni_paciente/:codigo_medicamento', updateMedicamentoPaciente);
router.delete('/delete/:dni_paciente/:codigo_medicamento', deleteMedicamentoPaciente);


export default router;
