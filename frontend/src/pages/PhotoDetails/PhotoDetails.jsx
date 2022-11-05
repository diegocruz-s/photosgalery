import { useContext, useEffect, useState } from "react";
import { PhotosContext } from "../../context/photoContext";
import { useParams } from 'react-router-dom';
import { routeImgs } from "../../utils/api";
import { Link } from 'react-router-dom';
import Message from "../../components/Message";
import './PhotoDetails.css';

const PhotoDetails = () => {

  const { getPhoto, photo, updatePhoto, loading, success, resetStates, error, deletePhoto: deletePhotoContext } = useContext(PhotosContext);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const { id } = useParams();

  useEffect(() => {
    (async function catchPhoto() {
      await getPhoto(id);
      await resetStates();
    })()
  }, []);

  const handleEditPhoto = async (e, id) => {
    e.preventDefault();
    resetStates();

    const newPhoto = {
      name: newName, description: newDescription
    }

    await updatePhoto(id, newPhoto);

    setEditPhoto(false);

  }

  const handleDeletePhoto = async (id) => {
    resetStates();

    await deletePhotoContext(id);

    setDeletePhoto(false);

  }

  return (
    <div className="photoDetails">

      <div className="optionsPhoto">
        <div className="home">
          <button><Link to='/'>Voltar</Link></button>
        </div>
        <div className="deletePhoto">
          <button onClick={() => {
            setDeletePhoto(true);
            setEditPhoto(false);
          }}>Deletar</button>
        </div>
        <div className="editPhoto">
          <button onClick={() => {
            setEditPhoto(true);
            setDeletePhoto(false);
            if (photo) {
              setNewName(photo.name);
              setNewDescription(photo.description);
            }
          }}>Editar</button>
        </div>
      </div>

      {error && (<Message msg={error} type="error" />)}
      {success && (<Message msg={success} type="success" />)}

      {photo && (
        <>
          <div className="details">
            <p className="namePhoto">{photo.name}</p>
            <p className="descPhoto">{photo.description}</p>
            <img src={`${routeImgs}/${photo.image}`} alt="" />
          </div>

          <div className="formEditPhoto">
            {editPhoto && (
              <div className="formEdit">
                <form onSubmit={(e) => handleEditPhoto(e, photo.id)} className="editPhoto">
                  <input type="text" onChange={(e) => setNewName(e.target.value)} value={newName} />
                  <input type="text" onChange={(e) => setNewDescription(e.target.value)} value={newDescription} />

                  {loading ? (
                    <input type="submit" value="Aguarde..." disabled />
                  ) : (
                    <input type="submit" value="Atualizar" />
                  )}
                </form>
                <button className="cancelEdit" onClick={() => setEditPhoto(false)}>X</button>
              </div>
            )}
          </div>

          <div className="confirmDeletePhoto">
            {deletePhoto && (
              <div className="confirmDelete">
                <h2>Deseja apagar a imagem?</h2>
                <div className="btns">
                  <Link to='/'><button onClick={() => handleDeletePhoto(photo.id)}>Sim</button></Link>
                  <button onClick={() => setDeletePhoto(false)}>Não</button>
                </div>
              </div>
            )}
          </div>
        </>
      )}



    </div>
  )
}

export default PhotoDetails