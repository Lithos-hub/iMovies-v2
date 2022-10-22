import { defineStore } from "pinia";
import { MovieModel, MovieVideoModel } from "../models/interfaces/Movie";
import MoviesServices from "../services/Movies";
import { MovieAxiosOptions } from "../models/interfaces/Movie";

import { ONE_WEEK_AGO, CURRENT_DATE } from "../services/utils";

export const useMoviesStore = defineStore("useMovies", {
  state: () => ({
    movies: [] as MovieModel[],
    movieOfTheWeek: undefined as undefined | MovieModel,
    trailerOfTheWeek: undefined as undefined | MovieVideoModel,
  }),
  actions: {
    async getMovies(options: MovieAxiosOptions) {
      await MoviesServices.getMovies(options).then((res) => {
        this.movies = res as MovieModel[];
      });
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
        this.movieOfTheWeek = res[0] as MovieModel;
        await MoviesServices.getMovieTrailer(this.movieOfTheWeek.id).then(
          (res: any) => {
            this.trailerOfTheWeek = res[0] as MovieVideoModel;
          }
        );
      });
    },
  },
});
