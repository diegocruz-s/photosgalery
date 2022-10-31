import { Router } from "express";
import PhotoController from "../controllers/PhotoController.js";
import upImage from "../helpers/image.js";
const routes = Router();

routes.post('/', upImage.single('image'), PhotoController.createPhoto);
routes.get('/', PhotoController.readPhotos);
routes.get('/:id', PhotoController.readPhoto);
routes.put('/:id', PhotoController.updatePhoto);
routes.delete('/:id', PhotoController.deletePhoto);

export default routes;