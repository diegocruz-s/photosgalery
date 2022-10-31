import express from 'express';
import cors from 'cors'
import routes from './routes/routes.js';
import './db/conn.js'

class App {
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    routes(){
        this.app.use('/photos', routes);
    }

}

export default new App().app;
