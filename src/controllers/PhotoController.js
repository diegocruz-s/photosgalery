import db from '../db/conn.js';

class PhotoController {
    test(req, res){

        const query = "INSERT INTO photos(name, image) values(?, ?)"
        const data = ["Diego Cruz's", "132616489641453651674.png"]

        db.query(query, data, (err) => {
            if(err){
                console.log(err);
                return;
            }

            return res.json({ message: 'Ok test!' })
            
        });
    }

    

}

export default new PhotoController();