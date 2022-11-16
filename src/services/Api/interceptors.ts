import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import Api from "./index";
import AuthServices from "../Auth";

export async function requestInterceptor(
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> {
  return config;
}

export async function requestErrorInterceptor(
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> {
  return config;
}

export async function responseInterceptor(
  response: AxiosResponse
): Promise<AxiosResponse> {
  return response;
}

let refreshingAuth: undefined | Promise<User | null>;

export async function responseErrorInterceptor(
  error: AxiosError
): Promise<boolean> {
  switch (error.response?.status) {
    // Unauthorized
    case 401:
      if ("undefined" === typeof refreshingAuth) {
        refreshingAuth = AuthServices.refresh();
      }
      if (await refreshingAuth) {
        return Api.client.request({
          ...error.config,
          data: JSON.parse(error.config.data),
        });
      }
      refreshingAuth = undefined;
      return Promise.reject(error.message);
    // Forbidden
    case 403:
      AuthServices.logout();
      return Promise.reject(error.message);
    default:
      return Promise.reject(error.message);
  }
}
