import { APIMOVIES } from "@/types/api_movie.type";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

//COMPLETE O PROPS movie PARA UTILIZAR A TIPAGEM DA API
type Props = {
  movie: APIMOVIES;
};

export const MovieCard = ({ movie }: Props) => {
  const router = useRouter();
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/movie/[id]",
          params: {
            id: movie.id,
            title: movie.title,
          },
        })
      }
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.titleMovie}>{movie.title}</Text>
        <Text>{movie.release_date}</Text>
        <Text>Lang: {movie.original_language}</Text>
        <View style={styles.rank}>
          <Text>Avaliação:</Text>
          <Text style={{ color: "yellow" }}>
            {Math.round(movie.vote_average * 10)}% ({movie.vote_count} votos)
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#5C668B",
    marginBottom: 8,
    borderRadius: 8,
    padding: 8,
    flexDirection: "row",
    gap: 8,
  },
  titleMovie: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  containerCard: {},
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: "white",
    marginRight: 8,
    flexShrink: 0,
    alignSelf: "center",
    marginVertical: 8,
    marginLeft: 0,
  },
  rank: {},
});
