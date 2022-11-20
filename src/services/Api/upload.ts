import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestTransformer,
} from "axios";

class UploadApi {
  // private static instance: UploadApi;
  // public client!: AxiosInstance;
  // constructor() {
  //   if (!UploadApi.instance) {
  //     this.client = axios.create({
  //       baseURL: `${import.meta.env.VITE_API_URL}/api/v1/`,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Accept: "/",
  //       },
  //     });
  //     UploadApi.instance = this;
  //   }
  //   return UploadApi.instance;
  // }
  // get post() {
  //   return this.client.post;
  // }
  // public setAuthorization(token?: string) {
  //   if (token) {
  //     this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   } else {
  //     this.removeAuthorization();
  //   }
  // }
  // public removeAuthorization() {
  //   if (this.client.defaults.headers.common?.Authorization) {
  //     delete this.client.defaults.headers.common?.Authorization;
  //   }
  // }
  // public uploadFile(file: File) {
  //   return new Promise(
  //     async (
  //       resolve: (value: {
  //         code?: number;
  //         error: boolean;
  //         data: unknown;
  //       }) => void,
  //       reject
  //     ) => {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       try {
  //         const response = await this.client.post("file", formData);
  //         resolve({
  //           code: response.status,
  //           error: response.status < 200 || response.status >= 300,
  //           data: response.data,
  //         });
  //       } catch (error: unknown) {
  //         console.error(error);
  //         const { response } = error as AxiosError;
  //         resolve({
  //           code: response?.status,
  //           error: true,
  //           data: response?.data,
  //         });
  //       }
  //     }
  //   );
  // }
}
export default new UploadApi();
