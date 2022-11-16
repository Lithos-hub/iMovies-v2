import { AxiosRequestTransformer } from "axios";

const exampleRequestTransformation: AxiosRequestTransformer = (data) => {
  return data;
};

const exampleResponseTransformation: AxiosRequestTransformer = (data) => {
  return data;
};

/**
 * Array of transformations to do to data and headers before send to the server.
 *
 * **Order matters**
 */
export const requestTransforms: AxiosRequestTransformer[] = [
  exampleRequestTransformation,
];

/**
 * Array of transformations to do to data before pass it to the handler.
 *
 * **Order matters**
 */
export const responseTransforms: AxiosRequestTransformer[] = [
  exampleResponseTransformation,
];
