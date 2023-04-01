import {Router} from 'express';
import { createMedico, deleteMedico, getMedico, getMedicos, updateMedico } from '../controllers/medico.ctrl.js';

const router = Router();


router.get('/get', getMedicos);
router.get('/get/:dni_medico', getMedico);
router.post('/create', createMedico);
router.patch('/update/:dni_medico', updateMedico);
router.delete('/delete/:dni_medico', deleteMedico);

export default router;


