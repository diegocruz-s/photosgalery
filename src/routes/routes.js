import { Router } from "express";
import PhotoController from "../controllers/PhotoController.js";
const routes = Router();

routes.get('/', PhotoController.test)

export default routes;