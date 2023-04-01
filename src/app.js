import express, { json } from "express";
const app = express();
import medicoRoute from './routes/medicos.routes.js';
import medicamentoRoute from './routes/medicamentos.routes.js';
import pacienteRoute from './routes/pacientes.routes.js';
import citaRoute from './routes/citas.routes.js';
import medico_cirugiaRoute from './routes/medico_cirugia.routes.js';
import medico_hospitalRoute from './routes/medico_hospital.route.js';
import horarioRoute from './routes/horario.routes.js';
import registro_citas_agendadasRoute from './routes/registro_citas_agendadas.routes.js';
import cors from 'cors';

app.use(cors);


// import medicamento_pacienteRoute from './routes/medicamento_paciente.routes.js';
// import examenRoute from './routes/examen.routes.js';
// import alergiaRoute from "./routes/alergia.routes.js";

/** ---------------- 
 * Middlewares
-------------------*/
/**
 * Permite leer el body de las solicitudes
 */
app.use(express.json());


app.get('/', (req, res)=> {
    res.send('<h1>Hola, mundo</h1>');
})

app.use('/medico', medicoRoute);
app.use('/medicamento', medicamentoRoute);
app.use('/paciente', pacienteRoute);
app.use('/cita', citaRoute);
app.use('/medico_cirugia', medico_cirugiaRoute);
// app.use('/examen', examenRoute);
app.use('/medico_hospital', medico_hospitalRoute);
app.use('/horario', horarioRoute);
app.use('/registro_citas_agendadas', registro_citas_agendadasRoute);



// app.use('/medicamento_paciente', medicamento_pacienteRoute);
// app.use('/alergia', alergiaRoute);
// app.use('/hospital', hospitalRoute);
// app.use('/examen', examenRoute);



app.use((req, res, next)=> {
    res.status(404).json({
        msg: 'Endpoint not found'
    })
})



export default app;
