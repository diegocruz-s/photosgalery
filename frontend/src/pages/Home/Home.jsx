import { useContext, useEffect, useState } from "react";
import FormCreate from "../../components/FormCreate";
import Message from "../../components/Message";
import Photo from "../../components/Photo";
import { PhotosContext } from "../../context/photoContext";

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
        <p className="noPhotos">Carregando...</p>
    }

    return (
        <div className="Home">
            <h1>Fotos</h1>
            <div className="allPhotos">
                <FormCreate />
                <div className="errorSuccess">
                    {error && (<Message msg={error} type="error" />)}
                    {success && (<Message msg={success} type="success" />)}
                </div>
                {(allPhotos && allPhotos.length > 0) ? (allPhotos.map(photo => (
                    <Photo photo={photo} key={photo.id} />
                ))) : (
                    <p>Sem fotos...</p>
                )}
            </div>
        </div>
    )
}

export default Home