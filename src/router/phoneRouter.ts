import { Router } from "express";
import { 
    searchPhoneByNumber, 
    searchPhoneByContactId, 
    deletePhoneById, 
    deletePhonesByContactId, 
    addNewPhone 
} from "../controllers/phoneController.js";

const phoneRouter = Router();

phoneRouter.get('/phone/number/:numero', searchPhoneByNumber);
phoneRouter.get('/phone/contact/:id', searchPhoneByContactId);
phoneRouter.delete('/phone/:id', deletePhoneById);
phoneRouter.delete('/phone/contact/:id', deletePhonesByContactId);
phoneRouter.post('/phone', addNewPhone);

export default phoneRouter;
