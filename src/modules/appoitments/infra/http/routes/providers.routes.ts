import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate'
import ProvidersControllers from "../controllers/ProvidersControllers";


const providersRouter = Router()
const  providersControllers = new ProvidersControllers()
const 