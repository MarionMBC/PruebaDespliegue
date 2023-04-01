/**
 * Autor: Jennebier Esther Alvarado López
 * 20191000717
 * Fecha: 19/03/2023
 */

import {Router} from 'express';
import { createCita, deleteCita, getCita, getCitasMedicoFecha, getCitasPaciente, getCitasPacienteFecha, updateCita } from '../controllers/cita.ctrl.js';

const router = Router();

router.get('/getCitasParaPaciente/:dni_paciente', getCitasPaciente);
router.get('/getCitasParaPacienteFecha/:dni_paciente/:fecha', getCitasPacienteFecha);
router.get('/getCitasMedicoFecha/:dni_medico/:fecha', getCitasMedicoFecha);
router.get('/get/:codigo_cita', getCita);
router.post('/create', createCita);
router.patch('/update/:codigo_cita', updateCita);
router.delete('/delete/:codigo_cita', deleteCita);


export default router;