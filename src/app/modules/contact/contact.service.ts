import { QueryBuilder } from "../../utils/QueryBuilder.js";
import type { TContact } from "./contact.interface.js";
import { contactModel } from "./contact.model.js";


const createContact = async (contact: TContact) => {
  const result = await contactModel.create(contact);
  return result;
};
// const getAllContact = async () => {
//   const result = await contactModel.find();
//   return result;
// };

const getAllContact = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(contactModel.find(), query)
    const contactData = queryBuilder
        .filter()
        // .search()
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        contactData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
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
