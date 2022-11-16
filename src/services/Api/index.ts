import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestTransformer,
} from "axios";

// import qs from "qs";
import {
  requestErrorInterceptor,
  requestInterceptor,
  responseErrorInterceptor,
  responseInterceptor,
} from "./interceptors";
import { requestTransforms, responseTransforms } from "./transforms";

class Api {
  private static instance: Api;
  public client!: AxiosInstance;
  public config = {};

  constructor() {
    if (!Api.instance) {
      this.client = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}/api/v1/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // paramsSerializer: (params) => qs.stringify(params),
      });

      this.client.interceptors.request.use(
        requestInterceptor,
        requestErrorInterceptor
      );
      this.client.interceptors.response.use(
        responseInterceptor,
        responseErrorInterceptor
      );
      this.client.defaults.transformRequest = (
        this.client.defaults.transformRequest as AxiosRequestTransformer[]
      ).concat(...requestTransforms);
      this.client.defaults.transformResponse =
        this.client.defaults.transformResponse.concat(...responseTransforms);
      Api.instance = this;
    }

    return Api.instance;
  }

  get get() {
    return this.client.get;
  }
  get post() {
    return this.client.post;
  }
  get patch() {
    return this.client.patch;
  }
  get put() {
    return this.client.put;
  }
  get delete() {
    return this.client.delete;
  }

  public setAuthorization(token?: string) {
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      this.removeAuthorization();
    }
  }

  public removeAuthorization() {
    if (this.client.defaults.headers.common?.Authorization) {
      delete this.client.defaults.headers.common?.Authorization;
    }
  }
}
export default new Api();
