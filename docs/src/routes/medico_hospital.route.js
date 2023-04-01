import {Router} from 'express';
import { getMedicoHospital } from '../controllers/medico_hospital.ctrl.js';
const router = Router();

router.get('/getMedico/:dni_medico', getMedicoHospital);
 router.get('/getMedicos', getMedicoHospital);
// router.post('/createMedico_hospital', ()=>{});
// router.patch('/updateMedico_hospital', ()=>{});
// router.delete('/deleteMedico_hospital', ()=>{});

export default router;