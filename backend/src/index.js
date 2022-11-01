import express from 'express';
import cors from 'cors'
import routes from './routes/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import './db/conn.js'
  
class App {
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use('/savesImgs', express.static(path.join(__dirname, '../savesImgs')));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    } 

    routes(){
        this.app.use('/photos', routes);
    }

}

export default new App().app;
