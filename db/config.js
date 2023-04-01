// import { DB_SSL, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from '../src/env-config.js';
import {createPool} from 'mysql2/promise';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();



export const pool = createPool({
    host: process.env.DB_HOST || 'healthfiles.mysql.database.azure.com',
    user: process.env.DB_USER || 'HealthFiles' ,
    password: process.env.DB_PASSWORD || 'Saoko1234!',
    database: process.env.DB_NAME || 'healthfiles',
    port: process.env.DB_PORT || 3306,
});

// ssl: {ca: fs.readFileSync('../src/SSL/DigiCertGlobalRootCA.crt.pem')}
