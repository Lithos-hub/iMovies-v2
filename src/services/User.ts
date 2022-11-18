import { User } from "../models/interfaces/User";
import Api from "./Api";

export default {
  async getUser(_id: string) {
    const { data } = await Api.get(`users/${_id}`);
    return data;
  },
  async updateUser(token: string, value: User) {
    const id = localStorage.getItem("id");
    Api.setAuthorization(token);
    const { data } = await Api.put(`users/${id}`, value);
    return data;
  },
};
