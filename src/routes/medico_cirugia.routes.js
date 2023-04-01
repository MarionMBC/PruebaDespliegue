/**
 * Autor: Rony Josue Gomez Oyuela
 * 20171004489
 * fecha: 20/03/2023
 */


import { Router } from "express";
import { createMedicoCirugia, updateMedicoCirugia, deleteMedicoCirugia, getMedicoCirugia } from "../controllers/medico_cirugia.ctrl.js";

const router = Router();
    router.get('/get/:codigo_examen', getMedicoCirugia);
    router.post('/create', createMedicoCirugia);
    router.patch('/update/:codigo_examen/:dni_medico/:fecha', updateMedicoCirugia);
    router.delete('/delete/:codigo_cirugia', deleteMedicoCirugia);

export default router;
