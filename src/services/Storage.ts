import UploadApi from "./Api/Upload";

export default {
  async upload(token: string, file: File) {
    UploadApi.setAuthorization(token);
    const { data } = await UploadApi.uploadFile(file);
    return data;
  },
};
