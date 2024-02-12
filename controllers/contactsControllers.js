import { listContacts, getContactById, removeContact, addContact } from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

async function getAllContacts(req, res, next) {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getContact(req, res, next) {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;
  try {
    const deletedContact = await removeContact(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(deletedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  try {
    const { error } = createContactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateContactById(req, res, next) {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const { error } = updateContactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const updatedContact = await updateContact(id, { name, email, phone });
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getAllContacts, getContact, deleteContact, createContact, updateContactById };
