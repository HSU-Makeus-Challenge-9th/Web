export type Movie = {
  id: number;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl?: string;
  releaseDate: string;
  voteAverage: number;
  voteCount?: number;
  isAdult?: boolean;
};