import { validationError } from "../models/interfaces/Error";
import { AxiosError } from "axios";

export const useErrorHandle = (err: AxiosError | Record<string, any>) => {
  console.log({ err });
  const {
    response: {
      data: { errors, error },
    },
  } = err;
  if (errors && errors.length) {
    return errors
      .map(({ msg, param }: validationError) => `${msg} on ${param} field. `)
      .join("");
  } else {
    return error;
  }
};
