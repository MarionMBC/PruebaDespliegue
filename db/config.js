import { DB_SSL, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from '../src/env-config.js';
import {createPool} from 'mysql2/promise';
import fs from 'fs';


export const pool = createPool({
    host:'healthfiles.mysql.database.azure.com',
    user:  'HealthFiles' ,
    password: 'Saoko1234!',
    database: 'healthfiles',
    port: 3306,
});

// ssl: 'ca: fs.readFileSync(\'./SSL/DigiCertGlobalRootCA.crt.pem\')' ,
