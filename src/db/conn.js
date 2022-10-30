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
}) 

export default connection;