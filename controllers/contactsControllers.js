import { listContacts, getContactById, removeContact, addContact, updateContact } from "../services/contactsServices.js";
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
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateContactById(req, res, next) {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  // Перевірка чи передано хоча б одне поле
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "Body must have at least one field" });
  }

  try {
    // Валідація полів з використанням схеми
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Отримання поточного контакту
    const currentContact = await getContactById(id);
    if (!currentContact) {
      return res.status(404).json({ message: "Not found" });
    }

    // Оновлення контакту, збереження поточних значень, якщо відповідне поле не передано
    const updatedContact = await updateContact(id, {
      name: name || currentContact.name,
      email: email || currentContact.email,
      phone: phone || currentContact.phone
    });

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getAllContacts, getContact, deleteContact, createContact, updateContactById };
