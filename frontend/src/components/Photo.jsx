import { routeImgs } from "../utils/api"
import { BsEyeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import './Photo.css';

const Photo = ({ photo }) => {
    return (
        <div className="photo">

            <p className="titlePhoto">{photo.name}</p>

            <div className="contentPhoto">
                <img src={`${routeImgs}/${photo.image}`} alt="" />
            </div>

            <div className="viewPhotoDetails">
                <Link to={`/photo/${photo.id}`}>
                    <BsEyeFill />
                </Link>
            </div>

        </div>
    )
}

export default Photo