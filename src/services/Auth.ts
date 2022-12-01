import { AxiosResponse } from "axios";
import { storeToRefs } from "pinia";
import { User, UserLogin, UserSignup } from "../models/interfaces/User";
import { useUserStore } from "../stores/User";
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
  async getUserInfo() {
    API.setAuthorization();
    API.setJsonHeader();
    const userStore = useUserStore();
    const { USER_ID } = storeToRefs(userStore);
    return await API.post(`auth/session`, { _id: USER_ID.value });
  },
  logout() {
    localStorage.clear();
    location.reload();
  },
};
