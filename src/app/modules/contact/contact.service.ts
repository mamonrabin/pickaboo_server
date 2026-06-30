import type { TContact } from "./contact.interface.js";
import { contactModel } from "./contact.model.js";


const createContact = async (contact: TContact) => {
  const result = await contactModel.create(contact);
  return result;
};
const getAllContact = async () => {
  const result = await contactModel.find();
  return result;
};

const getSingleContact = async (id: string) => {
  const result = await contactModel.findById(id);
  return result;
};


const deleteSingleContact = async (id: string) => {
  const result = await contactModel.findByIdAndDelete(id);
  return result;
};

export const contactService = {
  createContact,
  getAllContact,
  getSingleContact,
  deleteSingleContact,
};
