import { PERSONS_ENDPOINT } from "../utils/constants";
import { create, edit, find, remove } from "./api";

export const getPersons = async () => {
  const result = await find(PERSONS_ENDPOINT);
  return result.data;
};

export const getPersonById = async (id) => {
  const result = await find(PERSONS_ENDPOINT + "/" + id);
  return result.data;
};

export const getPersonByName = async (name) => {
  const result = await find(PERSONS_ENDPOINT + "/name/" + name);
  return result.data;
};

export const createPerson = async (values) => {
  const result = await create(PERSONS_ENDPOINT, values);
  return result.data;
};

export const removePerson = async (id) => {
  const result = await remove(PERSONS_ENDPOINT, id);
  return result.data;
};

export const editPerson = async (id, values) => {
  const result = await edit(PERSONS_ENDPOINT, id, values);
  return result.data;
};
