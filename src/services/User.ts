import { User } from "../models/interfaces/User";
import { Api } from "./Api";

const API = new Api();

export default {
  async getUser(_id: string) {
    API.setJsonHeader();
    const { data } = await API.get(`users/${_id}`);
    return data;
  },
  async updateUser(token: string, value: User) {
    const id = localStorage.getItem("id");
    API.setAuthorization(token);
    API.setJsonHeader();
    const { data } = await API.put(`users/${id}`, value);
    return data;
  },
};
