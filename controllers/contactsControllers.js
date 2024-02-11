// import contactsService from "../services/contactsServices.js";
const contactsService = require('../services/contactsServices');

export const getAllContacts = (req, res) => {
    const allContacts = contactsService.listContacts();
    res.status(200).json(allContacts);
};

export const getOneContact = (req, res) => {};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
