import { User } from "../models/interfaces/User";
import api from "./Api";

export default {
  async getUser(_id: string) {
    const { data } = await api.get(`users/${_id}`);
    return data;
  },
  async updateUser(value: User) {
    console.log("Updating: ", value);
    const id = localStorage.getItem("id");
    const { data } = await api.post(`user/${id}`, value);
    return data;
  },
};
