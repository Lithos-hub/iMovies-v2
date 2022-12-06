import { defineStore } from "pinia";
import {
  MovieDetailsModel,
  MovieListModel,
  MovieVideoMinModel,
  MovieVideoModel,
} from "../models/interfaces/Movie";
import { MovieAxiosOptions } from "../models/interfaces/Movie";
import { ArtistModel } from "../models/interfaces/Artist";

import MoviesServices from "../services/Movies";
import MyMoviesServices from "../services/MyMovies";
import { ONE_WEEK_AGO, CURRENT_DATE, useErrorHandle } from "../services/utils";

import noImage from "../assets/img/no-image.jpg";
import noImagePan from "../assets/img/no-image-pan.jpg";
import { useSnackbarStore } from "../components/Snackbar/store";
import { AxiosError } from "axios";

export const useMoviesStore = defineStore("useMovies", {
  state: () => ({
    callCounter: 0,
    errorImage: noImage,
    errorImagePan: noImagePan,
    movies: [] as MovieListModel[],
    movie: {} as MovieDetailsModel,
    genres: [],
    favourite: [] as number[],
    wishlist: [] as number[],
    trailers: [] as MovieVideoMinModel[],
    movieTrailer: {} as MovieVideoModel,
    artistResults: [] as ArtistModel[],
    movieOfTheWeek: undefined as undefined | MovieListModel,
    trailerOfTheWeek: undefined as undefined | MovieVideoModel,
  }),
  actions: {
    async getMovies(options: MovieAxiosOptions) {
      await MoviesServices.getMovies(options).then((res: any) => {
        this.movies = res.sort((a: MovieListModel, b: MovieListModel) => {
          const date_a = String(a.release_date);
          const date_b = String(b.release_date);

          const splitted_date_a = date_a.split("-").at(-1) as string;
          const splitted_date_b = date_b.split("-").at(-1) as string;
          return splitted_date_a < splitted_date_b ? 1 : -1;
        });
      });
    },
    clearMovies() {
      this.movies = [];
    },
    async getMovieDetails(id: number) {
      await MoviesServices.getMovieById(id).then((res) => {
        this.movie = res as MovieDetailsModel;
      });
    },
    async onSearch(searchOptions: MovieAxiosOptions) {
      this.movies = [];
      this.artistResults = [];
      try {
        const moviesResults = await MoviesServices.getMovieBySearch(
          searchOptions,
          true
        );
        this.movies = moviesResults as MovieListModel[];

        const artistsResults = await MoviesServices.getMovieBySearch(
          searchOptions,
          false
        );
        this.artistResults = artistsResults as ArtistModel[];
      } catch (error) {
        const { showSnackbar } = useSnackbarStore();
        showSnackbar("error", useErrorHandle(error as AxiosError));
      }
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

      try {
        const moviesResults = (await MoviesServices.getMovies(options)) as any; // TODO: TYPE
        this.movieOfTheWeek = moviesResults[0] as MovieListModel;
        const trailersResults = (await MoviesServices.getMovieTrailer(
          this.movieOfTheWeek.id
        )) as any; // TODO: TYPE
        this.trailerOfTheWeek = trailersResults[0] as MovieVideoModel;
      } catch (error) {
        const { showSnackbar } = useSnackbarStore();
        showSnackbar("error", useErrorHandle(error as AxiosError));
      }
    },
    async getMovieTrailers(id: number, title: string) {
      try {
        const trailersResults = (await MoviesServices.getMovieTrailer(
          id
        )) as any; // TODO: TYPE
        this.trailers.push({
          id,
          title,
          trailer_key: trailersResults[0].key,
        });
      } catch (error) {
        const { showSnackbar } = useSnackbarStore();
        showSnackbar("error", useErrorHandle(error as AxiosError));
      }
    },
    async getMovieTrailer(id: number | string) {
      try {
        const trailersResults = (await MoviesServices.getMovieTrailer(
          id
        )) as any; // TODO: TYPE
        this.movieTrailer = trailersResults[0];
      } catch (error) {
        const { showSnackbar } = useSnackbarStore();
        showSnackbar("error", useErrorHandle(error as AxiosError));
      }
    },
    getGenres() {
      MoviesServices.getGenres().then((res: any) => (this.genres = res));
    },
    async getMyMovies() {
      try {
        const moviesResults = await MyMoviesServices.getMoviesByUserId();

        this.favourite = moviesResults
          .filter(
            ({ category }: { category: string }) => category === "favourite"
          )
          .map(({ id }: { id: number }) => id);

        this.wishlist = moviesResults
          .filter(
            ({ category }: { category: string }) => category === "wishlist"
          )
          .map(({ id }: { id: number }) => id);

        this.callCounter++;
      } catch (error) {
        const { showSnackbar } = useSnackbarStore();
        showSnackbar("error", useErrorHandle(error as AxiosError));
      }
    },
    async postMovie(id: number, category: "favourite" | "wishlist") {
      if (category === "favourite") {
        if (this.favourite.includes(id)) {
          await MyMoviesServices.removeMovie(id, category);
        } else {
          await MyMoviesServices.postMovie(id, category);
        }
      } else {
        if (this.wishlist.includes(id)) {
          await MyMoviesServices.removeMovie(id, category);
        } else {
          await MyMoviesServices.postMovie(id, category);
        }
      }
      await this.getMyMovies();
    },
  },
});
