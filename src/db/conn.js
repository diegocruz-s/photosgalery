import mysql from 'mysql';

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projectmysql"
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
    PRIMARY KEY(id)
);`

connection.query(queryCreateTablePhotos, (err) => {
    if(err) {
        console.log('Erro na criação da tabela!', err.message); 
    }
});

export default connection;