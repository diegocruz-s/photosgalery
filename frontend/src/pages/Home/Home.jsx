import { useContext, useEffect, useState } from "react";
import FormCreate from "../../components/FormCreate";
import Message from "../../components/Message";
import Photo from "../../components/Photo";
import { PhotosContext } from "../../context/photoContext";
import './Home.css';

const Home = () => {
    const { getPhotos, photos: allPhotos } = useContext(PhotosContext);
    const { loading, error, success, createPhoto, resetStates } = useContext(PhotosContext);

    useEffect(() => {
        (async function catchPhotos() {
            await getPhotos();
            if(success && !success.includes('apagada')){
                resetStates();
            }
        })()
    }, []);

    if(loading){
        <p className="loadingPhotos">Carregando...</p>
    }

    return (
        <div className="home">
            <h1>Fotos</h1>
            <div className="allPhotos">
                <FormCreate />
                <div className="errorSuccess">
                    {error && (<Message msg={error} type="error" />)}
                    {success && (<Message msg={success} type="success" />)}
                </div>
                <div className="photos">
                    {(allPhotos && allPhotos.length > 0) ? (allPhotos.map(photo => (
                        <Photo photo={photo} key={photo.id} />
                    ))) : (
                        <p className="noPhotos">Sem fotos...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home