import { useRef } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { PhotosContext } from '../context/photoContext';
import './FormCreate.css';

const FormCreate = () => {

    const { loading, error, success, createPhoto } = useContext(PhotosContext);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const refInputImage = useRef();

    const handleFile = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0]);
        setPreviewImage(e.target.files[0]);
    }

    const changePreview = () => {
        setPreviewImage('');
        refInputImage.current.value = ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPhoto = {
            name, image, description
        }

        const formData = new FormData();

        console.log(newPhoto);

        Object.keys(newPhoto).forEach(key => {
            formData.append(key, newPhoto[key]);
        });

        await createPhoto(formData);

        setName('');
        setDescription('');
        setImage('');
        setPreviewImage('');

    }

    return (
        <div className='formAddPhoto'>
            <form onSubmit={(e) => handleSubmit(e)} id="addPhoto">
                <label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name || ''} />
                </label>
                <label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description || ''} />
                </label>
                <label>
                    <input ref={refInputImage} type="file" onChange={(e) => handleFile(e)} />
                </label>

                {loading ? (
                    <input type="submit" disabled value="Aguarde..." />
                ) : (
                    <input type="submit" value="Criar" />
                )}
            </form>

            <div className="previewImageAdd">
                {previewImage && (
                    <>
                        <img src={URL.createObjectURL(previewImage)} alt="Preview da imagem" />
                        <button onClick={changePreview} className='btnCancelAddPhoto'>X</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default FormCreate