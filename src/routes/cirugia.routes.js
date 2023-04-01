/**
 * Autor:Incaivi Brandon Lazo Martinez
 * 20191001993
 * Fecha: 18/03/2023
 */

import {Router} from 'express';
import { createCirugia, deleteCirugia, getCirugia, getCirugias, updateCirugia } from '../controllers/cirugia.ctrl.js';

const router = Router();

router.get('/get', getCirugias);
router.get('/get/:codigo_cirugia', getCirugia);
router.post('/create', createCirugia);
router.patch('/update/:codigo_cirugia', updateCirugia);
router.delete('/delete/:codigo_cirugia', deleteCirugia);


export default router;