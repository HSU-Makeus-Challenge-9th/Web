export type MovieDetails = {
  title: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  tagline: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
};

type MovieDetailsGenres = {
  id: number;
  name: string;
};

type MovieDetailsProductionCompanies = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type MovieDetailsProductionCountries = {
  iso_3166_1: string;
  name: string;
};

type MovieDetailsSpokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieDetailsResponse = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: boolean;
  budget: number;
  genres: MovieDetailsGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: ["US"];
  overview: string;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  production_companies: MovieDetailsProductionCompanies[];
  production_countries: MovieDetailsProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: MovieDetailsSpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};
