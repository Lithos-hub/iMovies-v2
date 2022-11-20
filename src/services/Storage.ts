import { Api } from "./Api";

const API = new Api();

export default {
  async upload(token: string, file: File) {
    API.setAuthorization(token);
    API.setFormHeader();
    const { data } = await API.uploadFile(file);
    return data;
  },
};
