import { AxiosRequestConfig } from "axios";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/User";
import { Api } from "./Api";

const API = new Api();

interface Options extends AxiosRequestConfig {
  id: number;
  category: "favourite" | "wishlist";
  [others: string]: any;
}

export default {
  async getMoviesByUserId() {
    const { USER_ID } = storeToRefs(useUserStore());
    const { data } = await API.get(`movies/${USER_ID.value}`);
    return data;
  },
  async postMovie(id: number | string, category: string) {
    API.setAuthorization();
    API.setJsonHeader();
    const { data } = await API.post(`movies/${category}`, {
      id,
      category,
    } as Options);
    return data;
  },
  async removeMovie(id: number, category: string) {
    API.setAuthorization();
    API.setJsonHeader();
    const { data } = await API.delete(`movies/${category}`, {
      id,
      category,
    } as Options);
    return data;
  },
};
