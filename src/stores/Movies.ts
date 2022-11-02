import { defineStore } from "pinia";
import {
  MovieDetailsModel,
  MovieListModel,
  MovieVideoMinModel,
  MovieVideoModel,
} from "../models/interfaces/Movie";
import MoviesServices from "../services/Movies";
import { MovieAxiosOptions } from "../models/interfaces/Movie";

import noImage from "../assets/img/no-image.jpg";
import noImagePan from "../assets/img/no-image-pan.jpg";

import { ONE_WEEK_AGO, CURRENT_DATE } from "../services/utils";
import { ArtistModel } from "../models/interfaces/Artist";

export const useMoviesStore = defineStore("useMovies", {
  state: () => ({
    errorImage: noImage,
    errorImagePan: noImagePan,
    movies: [] as MovieListModel[],
    movie: {} as MovieDetailsModel,
    genres: [],
    trailers: [] as MovieVideoMinModel[],
    movieTrailer: {} as MovieVideoModel,
    artistResults: [] as ArtistModel[],
    movieOfTheWeek: undefined as undefined | MovieListModel,
    trailerOfTheWeek: undefined as undefined | MovieVideoModel,
  }),
  actions: {
    async getMovies(options: MovieAxiosOptions) {
      await MoviesServices.getMovies(options).then((res) => {
        this.movies = res as MovieListModel[];
      });
    },
    async getMovieDetails(id: string) {
      await MoviesServices.getMovieById(id).then((res) => {
        this.movie = res as MovieDetailsModel;
      });
    },
    async onSearch(searchOptions: MovieAxiosOptions) {
      this.movies = [];
      this.artistResults = [];
      await MoviesServices.getMovieBySearch(searchOptions, true).then(
        async (res) => {
          this.movies = res as MovieListModel[];
          await MoviesServices.getMovieBySearch(searchOptions, false).then(
            (res) => {
              this.artistResults = res as ArtistModel[];
            }
          );
        }
      );
    },
    async getMovieOfTheWeek() {
      const options = {
        page: 1,
        "primary_release_date.gte": ONE_WEEK_AGO,
        "primary_release_date.lte": CURRENT_DATE,
        "vote_average.gte": 7,
        sort_by: "popularity.desc",
        include_video: true,
      };
      await MoviesServices.getMovies(options).then(async (res: any) => {
        this.movieOfTheWeek = res[0] as MovieListModel;
        await MoviesServices.getMovieTrailer(this.movieOfTheWeek.id).then(
          (res: any) => {
            this.trailerOfTheWeek = res[0] as MovieVideoModel;
          }
        );
      });
    },
    async getMovieTrailers(id: number, title: string) {
      await MoviesServices.getMovieTrailer(id).then((res: any) => {
        this.trailers.push({
          id,
          title,
          trailer_key: res[0].key,
        });
      });
    },
    async getMovieTrailer(id: number | string) {
      await MoviesServices.getMovieTrailer(id).then((res: any) => {
        this.movieTrailer = res[0];
      });
    },
    async getGenres() {
      await MoviesServices.getGenres().then((res: any) => {
        this.genres = res;
      });
    },
  },
});
