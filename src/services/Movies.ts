import { MovieAxiosOptions } from "../models/interfaces/Movie";

import { apiCall, getQueryByOptions, getQueryById } from "./utils";

export default {
  getMovies(options: MovieAxiosOptions) {
    const url = getQueryByOptions(options);
    return apiCall(url);
  },
  getMovieTrailer(id: number | string) {
    const url = getQueryById(id);
    return apiCall(url);
  },
};
