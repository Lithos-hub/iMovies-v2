import { User, UserLogin, UserSignup } from "../models/interfaces/User";
import api from "./Api";

export default {
  async signin(value: UserLogin) {
    const { data } = await api.post(`auth/signin`, value);
    return data;
  },
  async signup(value: UserSignup) {
    const { data } = await api.post(`auth/signup`, value);
    return data;
  },
  refresh() {
    console.log("Refresh");
  },
  logout() {
    console.log("Logout");
  },
};
