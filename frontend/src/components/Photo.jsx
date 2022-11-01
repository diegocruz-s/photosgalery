import { routeImgs } from "../utils/api"
import { BsEyeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

const Photo = ({ photo }) => {
    return (
        <div className="photo">

            <div className="contentPhoto">
                <p>{photo.name}</p>
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