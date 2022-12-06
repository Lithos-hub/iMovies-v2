import { MovieAxiosOptions } from "../models/interfaces/Movie";

import {
  apiCall,
  getQueryByOptions,
  getVideoQueryById,
  getQueryBySearch,
  getMovieQueryById,
  getGenresQuery,
} from "./utils";

export default {
  getMovies(options: MovieAxiosOptions) {
    const url = getQueryByOptions(options);
    return apiCall(url);
  },
  getMovieById(id: number) {
    const url = getMovieQueryById(id);
    return apiCall(url);
  },
  getMovieTrailer(id: number | string) {
    const url = getVideoQueryById(id);
    return apiCall(url);
  },
  getMovieBySearch(
    searchOptions: MovieAxiosOptions,
    isSearchingMovie: boolean
  ) {
    const url = getQueryBySearch(searchOptions, isSearchingMovie);
    return apiCall(url);
  },
  getGenres() {
    const url = getGenresQuery();
    return apiCall(url);
  },
};
