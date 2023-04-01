import { Router } from 'express';
import { createMedicamento, deleteMedicamento, getMedicamento, getMedicamentos, updateMedicamento } from '../controllers/medicamento.ctrl.js';

const router = Router();


router.get ('/get', getMedicamentos);
router.get ('/get/:codigo_medicamento', getMedicamento);
router.post ('/post', createMedicamento );
router.patch ('/updateMedicamento/:codigo_medicamento', updateMedicamento);
router.delete ('/deleteMedicamento/:codigo_medicamento', deleteMedicamento);

export default router;








