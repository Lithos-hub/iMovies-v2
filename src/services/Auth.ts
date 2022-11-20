import { AxiosResponse } from "axios";
import { User, UserLogin, UserSignup } from "../models/interfaces/User";
import { Api } from "./Api";

const API = new Api();

export default {
  async signin(value: UserLogin) {
    API.setJsonHeader();
    const { data } = await API.post(`auth/signin`, value);
    return data;
  },
  async signup(value: UserSignup) {
    API.setJsonHeader();
    const { data } = await API.post(`auth/signup`, value);
    return data;
  },
  async getUserInfo(): Promise<AxiosResponse<any, any> | User> {
    const id = localStorage.getItem("id") || null;
    const token = localStorage.getItem("id-token") || null;
    API.setAuthorization(token as string);
    API.setJsonHeader();
    return await API.post(`auth/session`, { id });
  },
  logout() {
    console.log("Logout");
  },
};
