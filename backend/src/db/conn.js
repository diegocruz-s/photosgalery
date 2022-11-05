import mysql from 'mysql';
import * as dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}) 

connection.connect((err) => {
    if(err){
        return console.log('Error DB!', err.message);
    }

    console.log('DB loaded!')
});

const queryCreateTablePhotos = `CREATE TABLE IF NOT EXISTS photos(
	id integer auto_increment not null,
    name varchar(30) not null,
    image varchar(45) not null,
    description varchar(45) not null,
    PRIMARY KEY(id)
);`

connection.query(queryCreateTablePhotos, (err) => {
    if(err) {
        console.log('Erro na criação da tabela!', err.message); 
    } 
});

export default connection;