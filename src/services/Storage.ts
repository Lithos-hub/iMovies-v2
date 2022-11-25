import { Api } from "./Api";

const API = new Api();

export default {
  async upload(file: File) {
    API.setAuthorization();
    API.setFormHeader();
    const { data } = await API.uploadFile(file);
    return data;
  },
};
