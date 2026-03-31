import { api } from "./api";

//CORRIJA AS FUNÇÕES DA API.
//EXPORTE AS DUAS FUNÇÕES
//CORRIJA O async/await
export const getMovies = async () => {
  const response = await api.get("/movie/popular");
  return response.data.results;
};

export const getMovieDetail = async (id: string) => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};
