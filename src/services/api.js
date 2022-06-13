import axios from "axios";
import { BASE_URL } from "../utils/constants";

const instance = axios.create({
  baseURL: BASE_URL
});

export const find = async (url) => {
  const result = await instance.get(url);
  return result.data;
};

export const create = async (url, values) => {
  const result = await instance.post(url, values);
  return result.data;
};

export const remove = async (url, id) => {
  const result = await instance.delete(url + "/" + id);
  return result.data;
};

export const edit = async (url, id, values) => {
  const result = instance.put(`${url}/${id}`, values);
  return result.data;
};
