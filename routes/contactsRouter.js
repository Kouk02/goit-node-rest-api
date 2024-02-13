import express from "express";
import { getAllContacts, deleteContact, createContact, getContact, updateContactById } from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getContact); // Додали роут для отримання контакту по id
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post("/", createContact);
contactsRouter.put("/:id", updateContactById); // Додали роут для оновлення контакту по id

export default contactsRouter;
