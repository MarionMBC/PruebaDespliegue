
/**
 * Autor: Bryan Josué Fernández
 * 20201000808
 * Fecha: 20/03/2023
 */

import { Router } from 'express';
import { createAlergia, deleteAlergia, getAlergia, getAlergias, updateAlergia } from '../controllers/alergia.ctrl.js';

const router = Router();

router.get ('/get', getAlergias);
router.get ('/get/:codigo_alergia', getAlergia);
router.post ('/post', createAlergia );
router.patch ('/updateAlergia/:codigo_alergia', updateAlergia);
router.delete ('/deleteAlergia/:codigo_alergia', deleteAlergia);

export default router;

