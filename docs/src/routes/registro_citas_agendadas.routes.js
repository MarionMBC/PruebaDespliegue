/**
 * Autor: Jennebier Esther Alvarado López
 * 20191000717
 * Fecha: 27/03/2023
 */

import {Router} from 'express';
import { createRegistro } from '../controllers/registro_citas_agendadas.ctrl.js';

const router = Router();

router.post('/create', createRegistro);

export default router;