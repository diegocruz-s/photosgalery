import db from '../db/conn.js';

class PhotoController {

    async createPhoto(req, res){

        try {
            const { name, description } = req.body;

            if(!name || !description || !req.file){
                return res.status(404).json({ error: 'Dados inválidos!' });
            };

            const image = req.file.filename;

            const query = `INSERT INTO photos(name, image, description) values(?, ?, ?)`;
            const data = [ name, image, description ];

            return new Promise(function(resolve, reject) {
                db.query(query, data, (error, data) => {
                    if(error){
                        return reject(res.status(404).json({ error: error.message }));
                    }else{
                        return resolve(res.status(201).json({ success: 'Foto criada', id: data.insertId }))
                    }
                }); 
            })

        } catch (error) {
            console.log('Error create', error.message);
            return res.json({ error: 'Error create!' });
        }
    }

    async readPhotos(req, res){

        try {
            const query = `SELECT * FROM photos`;

            db.query(query, (err, datas) => {
                if(err) {
                    return res.status(422).json({ error: 'Erro na captura de fotos!' })
                }else {
                    return res.status(200).json({ photos: datas });
                }
            })
        } catch (error) {
            console.log('Error create', error.message);
            return res.json({ error: 'Error create!' });
        }

    }

    async readPhoto(req, res){
        const { id } = req.params;

        const query = `SELECT * FROM ?? WHERE ?? = ?`;
        const data = ['photos', 'id', id];

        db.query(query, data, (error, datas) => {
            if(error){
                return res.status(404).json({ error: error.message })
            }else{
                return res.status(201).json({ photo: datas })
            }
        })

    }

    async updatePhoto(req, res){
        const { id } = req.params;
        const { name, description } = req.body;

        if(!name && !description) {
            return res.status(422).json({ error: 'Um dado é obrigatório!' })
        }

        const query = `UPDATE photos SET ?? = ?, ?? = ? WHERE ?? = ?`;
        const data = ['name', name, 'description', description,'id', id];

        db.query(query, data, (err) => {
            if(err) {
                return res.status(422).json({ error: err.message });
            }else {
                return res.status(201).json({ success: 'Foto atualizada!' });
            }
        });
        
    }

    async deletePhoto(req, res){
        const { id } = req.params;
        const query = `DELETE FROM photos WHERE ?? = ?`
        const data = ['id', id];

        db.query(query, data, (err) => {
            if(err){
                return res.status(422).json({ error: 'Erro ao deletar a foto!' });
            }else {
                return res.status(200).json({ success: 'Foto apagada!' });
            }
        });

    }

}

export default new PhotoController();