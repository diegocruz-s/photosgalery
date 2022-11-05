import { useState } from "react";
import { createContext } from "react";
import api from "../utils/api";


export const PhotosContext = createContext();

export const PhotosProvider = ({ children }) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [photo, setPhoto] = useState([]);

    const resetStates = () => {
        setSuccess(false);
        setError(null);
        setLoading(false);
    };

    const getPhotos = async () => {
        setPhotos([]);
        const url = `/photos`;
        const res = await api.get(url)
            .then(res => res.data.photos);
        
        setPhotos(res);
        return;
    }

    const getPhoto = async (id) => {
        const url = `/photos/${id}`;

        const res = await api.get(url)
            .then(res => res.data.photo);

        setPhoto(res[0])

        return res[0];
    }

    const createPhoto = async (photo) => { 
        setLoading(true);
        const url = `/photos`;
        const res = await api.post(url, photo)
            .then(res => res.data)
            .catch(err => err.response.data);
        
        if(res.error){
            setError(res.error);
            setLoading(false);
            return;
        }
        setSuccess(res.success);
        const newPhoto = await getPhoto(res.id);
        
        setPhotos(prevState => [...prevState, newPhoto]);

        setLoading(false);
        return;
    }

    const deletePhoto = async (id) => {
        resetStates();
        const url = `/photos/${id}`;
        const res = await api.delete(url)
            .then(res => res.data)
            .catch(err => err.response.data);
        
        if(res.error){
            setError(res.error);
            return;
        }

        setSuccess(res.success);
        return;

    }

    const updatePhoto = async (id, newPhoto) => {
        resetStates();
        setLoading(true);
        const url = `/photos/${id}`;
        const res = await api.put(url, newPhoto)
            .then(res => res.data)
            .catch(err => err.response.data);

        if(res.error){
            setError(res.error);
            return;
        }

        setSuccess(res.success);

        photo.name = newPhoto.name;
        photo.description = newPhoto.description;
        
        setLoading(false);
        return;

    }

    return(
        <PhotosContext.Provider value={{
            resetStates,
            getPhotos,
            getPhoto,
            createPhoto,
            deletePhoto,
            updatePhoto,
            photos,
            photo,
            loading,
            error,
            success,
        }}>
            { children }
        </PhotosContext.Provider>
    )
}