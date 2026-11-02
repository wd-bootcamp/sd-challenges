export type MovieData = {
  id: string;
  name: string;
  isLiked: boolean;
};

export type NewMovie = Omit<MovieData, "id">;

export type Recommendation = {
  id: string;
  name: string;
};
