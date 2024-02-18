const Contact = require("../models/contact");

async function listContacts() {
  return await Contact.find();
}

async function getContactById(contactId) {
  return await Contact.findById(contactId);
}

async function removeContact(contactId) {
  return await Contact.findByIdAndDelete(contactId);
}

async function addContact(name, email, phone) {
  return await Contact.create({ name, email, phone });
}

async function updateContact(contactId, newData) {
  return await Contact.findByIdAndUpdate(contactId, newData, { new: true });
}

export { listContacts, getContactById, removeContact, addContact, updateContact };
