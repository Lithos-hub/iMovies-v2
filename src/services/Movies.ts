import { MovieAxiosOptions } from "../models/interfaces/Movie";

import {
  apiCall,
  getQueryByOptions,
  getQueryById,
  getQueryBySearch,
} from "./utils";

export default {
  getMovies(options: MovieAxiosOptions) {
    const url = getQueryByOptions(options);
    return apiCall(url);
  },
  getMovieTrailer(id: number | string) {
    const url = getQueryById(id);
    return apiCall(url);
  },
  getMovieBySearch(
    searchOptions: MovieAxiosOptions,
    isSearchingMovie: boolean
  ) {
    const url = getQueryBySearch(searchOptions, isSearchingMovie);
    return apiCall(url);
  },
};
