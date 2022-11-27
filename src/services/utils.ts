import axios, { AxiosError } from "axios";
import { validationError } from "../models/interfaces/Error";
import { MovieAxiosOptions } from "../models/interfaces/Movie";

// Variables
export const currentDate = new Date();
export const TMDB_APIKEY = import.meta.env.VITE_TMDB_APIKEY;
export const BASE_URL = "https://api.themoviedb.org/3";
export const CURRENT_YEAR = new Date().getFullYear();
export const CURRENT_DATE = formatDate(getCurrentDay());
export const ONE_WEEK_AGO = formatDate(getDateAgo(7));
export const ONE_MONTH_AGO = formatDate(getDateAgo(30));

let searchMovieUrl = `${BASE_URL}/search/movie?api_key=${TMDB_APIKEY}`;

// Functions

export function getMonthName(month: string) {
  return {
    "01": "JAN",
    "02": "FEB",
    "03": "MAR",
    "04": "APR",
    "05": "MAY",
    "06": "JUN",
    "07": "JUL",
    "08": "AUG",
    "09": "SEP",
    "10": "OCT",
    "11": "NOV",
    "12": "DEC",
  }[month];
}

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

// The Movie DB API and the Mongo DB need this date format
export function formatDate(date: string) {
  let [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}

// The user will see this date format
export function parseDate(date: string | Date) {
  let [year, month, day] = String(date).split("-");
  return `${day} ${getMonthName(month)} ${year}`;
}

export const apiCall = (url: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        resolve(data.results ? data.results : data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getQueryByOptions = (options: MovieAxiosOptions): string => {
  let urlToSend = `${BASE_URL}/discover/movie?api_key=${TMDB_APIKEY}`;
  const queryOptions: Record<string, string> = {
    page: "&page=",
    by_adult: "&include_adult=",
    sort_by: "&sort_by=",
    year: "&year=",
    include_video: "&include_video=",
    with_genres: "&with_genres=",
    exclude_genres: "&exclude_genres=",
    "primary_release_date.gte": "&primary_release_date.gte=",
    "primary_release_date.lte": "&primary_release_date.lte=",
    "vote_average.gte": "&vote_average.gte=",
  };
  for (let option in options) {
    let query = queryOptions[option as keyof typeof queryOptions];
    let value = options[option as keyof typeof options];
    urlToSend += `${query}${value}`;
  }
  if (options.with_genres) {
    urlToSend = urlToSend.replace("search/movie", "genre/movie/list");
  }
  return urlToSend;
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

export const getVideoQueryById = (id: string | number): string => {
  return `${BASE_URL}/movie/${id}/videos?api_key=${TMDB_APIKEY}`;
};

export const getMovieQueryById = (id: string | number): string => {
  return `${BASE_URL}/movie/${id}?api_key=${TMDB_APIKEY}`;
};
export const getGenresQuery = (): string => {
  return `${BASE_URL}/genre/movie/list?api_key=${TMDB_APIKEY}`;
};

export const useDataCleaner = (data: Record<string, any>) => {
  return Object.assign(
    {},
    ...Object.keys(data)
      .map((key) => {
        if (data[key]) {
          return { [key]: data[key] };
        }
      })
      .filter((item) => item)
  );
};

export const useErrorHandle = (err: AxiosError | Record<string, any>) => {
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

export const calculateAge = (dateOfBirth: string) => {
  const yearInMilliseconds = 31536000000;
  const dateOfBirthToMillis = new Date(dateOfBirth).getTime();
  const currentDateToMillis = new Date().getTime();
  const diff = currentDateToMillis - dateOfBirthToMillis;
  return Math.floor(diff / yearInMilliseconds);
};
