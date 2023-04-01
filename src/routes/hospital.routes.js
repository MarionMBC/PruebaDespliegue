
/**
 * Autor: Bryan Josué Fernández
 * 20201000808
 * Fecha: 20/03/2023
 */


import { Router } from 'express';
import { createHospital, deleteHospital, getHospital, getHospitales, updateHospital } from '../controllers/hospital.ctrl.js';

const router = Router();


router.get ('/get', getHospital);
router.get ('/get/:codigo_hospital', getHospital);
router.post ('/post', createHospital );
router.patch ('/updateHospital/:codigo_hospital', updateHospital);
router.delete ('/deleteHospital/:codigo_hospital', deleteHospital);

export default router;






