import axios from "axios";
import { MovieAxiosOptions } from "../models/interfaces/Movie";

// Variables
export const currentDate = new Date();
export const TMDB_APIKEY = import.meta.env.VITE_TMDB_APIKEY;
export const BASE_URL = "https://api.themoviedb.org/3";
export const CURRENT_YEAR = new Date().getFullYear();
export const CURRENT_DATE = formatDate(getCurrentDay());
export const ONE_WEEK_AGO = formatDate(getDateAgo(7));
export const ONE_MONTH_AGO = formatDate(getDateAgo(30));

let url = `${BASE_URL}/discover/movie?api_key=${TMDB_APIKEY}`;
let searchMovieUrl = `${BASE_URL}/search/movie?api_key=${TMDB_APIKEY}`;

// Functions
export function getCurrentDay() {
  let millis = currentDate.getTime();
  let todayString = new Date(millis).toLocaleDateString("en-UK");
  return todayString; // => return the date in DD/MM/YYYY format
}

export function getDateAgo(days: number) {
  let aDateAgo = currentDate.setDate(currentDate.getDate() - days);
  let dateToString = new Date(aDateAgo).toLocaleDateString("en-UK");
  return dateToString; // => return the date in DD/MM/YYYY format
}

// The Movie DB API needs this date format
export function formatDate(date: string) {
  let [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}

export const apiCall = (url: string) => {
  console.log("Calling to: ", url);
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        resolve(data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getQueryByOptions = (options: MovieAxiosOptions): string => {
  const queryOptions: Record<string, string> = {
    page: "&page=",
    by_adult: "&include_adult=",
    sort_by: "&sort_by=",
    year: "&year=",
    include_video: "&include_video=",
    "primary_release_date.gte": "&primary_release_date.gte=",
    "primary_release_date.lte": "&primary_release_date.lte=",
    "vote_average.gte": "&vote_average.gte=",
  };
  for (let option in options) {
    let query = queryOptions[option as keyof typeof queryOptions];
    let value = options[option as keyof typeof options];
    url += `${query}${value}`;
  }
  return url;
};

export const getQueryBySearch = (
  options: MovieAxiosOptions,
  isSearchingMovie: boolean
): string => {
  let urlToSend = "";
  const queryOptions: Record<string, string> = {
    page: "&page=",
    by_adult: "&include_adult=",
    sort_by: "&sort_by=",
    year: "&year=",
    query: "&query=",
    include_video: "&include_video=",
    "primary_release_date.gte": "&primary_release_date.gte=",
    "primary_release_date.lte": "&primary_release_date.lte=",
    "vote_average.gte": "&vote_average.gte=",
  };
  for (let option in options) {
    let query = queryOptions[option as keyof typeof queryOptions];
    let value = options[option as keyof typeof options];
    urlToSend = searchMovieUrl += `${query}${value}`;
  }
  if (isSearchingMovie === false)
    urlToSend = searchMovieUrl.replace("search/movie", "search/person");
  return urlToSend;
};

export const getQueryById = (id: string | number): string => {
  return `${BASE_URL}/movie/${id}/videos?api_key=${TMDB_APIKEY}`;
};
