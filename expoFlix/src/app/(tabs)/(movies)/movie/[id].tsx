import { getMovieDetail } from "@/services/api_movies";
import { APIMOVIES } from "@/types/api_movie.type";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function Movie() {
  const { id, title } = useLocalSearchParams();
  const [movie, setMovie] = useState<APIMOVIES | null>(null);

  useEffect(() => {
    //COMPLETE O useEffect INSERINDO A FUNÇAO QUE CHAMA A LISTA DE FILMES
    movieDetail();
  }, []);

  const movieDetail = async () => {
    const resp = await getMovieDetail(id as string);
    //COMPLETE O movieDetail PARA QUE O useState RECEBA OS DADOS DA API
    setMovie(resp);
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: title as string,
          headerBackTitle: "Voltar",
          headerStyle: {
            backgroundColor: "#121936",
          },
          headerTintColor: "#fff",
        }}
      />
      <ScrollView style={{ backgroundColor: "#19244B" }} key={+id}>
        <View style={styles.container}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movie?.title}</Text>
            <Text style={styles.dateTitle}>
              ({movie?.release_date.split("-")[0]})
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>{movie?.release_date}</Text>
            {movie?.genres?.map((genre) => (
              <Text style={styles.text} key={genre.id}>
                {genre.name}{" "}
              </Text>
            ))}
          </View>
          <Text style={styles.text}>
            Avaliação dos usuários{" "}
            {Math.round((movie?.vote_average as number) * 10)}%{" "}
          </Text>
          <View style={styles.sinopseContainer}>
            <Text style={styles.sinopse}>Sinopse</Text>
            <Text style={styles.overview}>{movie?.overview}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  image: {
    width: 280,
    height: 419,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    marginTop: 10,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  dateTitle: {
    color: "#fff",
    fontSize: 26,
  },
  text: {
    color: "#fff",
  },
  sinopseContainer: {
    padding: 10,
  },
  sinopse: {
    color: "#fff",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  overview: {
    fontSize: 16,
    color: "#fff",
  },
});
