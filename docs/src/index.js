import app from "./app.js";
import { SERVER_PORT } from "./env-config.js";


/** 
 ** Inicializa el servidor
*/
app.listen( 6000, ()=>{
    console.log("Servidor inicializado en el puerto", SERVER_PORT);
});

