import { Router } from "express";
import {deleteContact, editContact, getContact, listContacts, newContact, searchContact } from "../controllers/contactController.js";

const contactRouter = Router();

contactRouter.get('/contact', listContacts)
contactRouter.get('/contact/:id', getContact)
contactRouter.delete('/contact/:id', deleteContact)
contactRouter.post('/contact', newContact)
contactRouter.put('/contact/:id', editContact)
contactRouter.get('/contact/search/:term', searchContact);


export default contactRouter;