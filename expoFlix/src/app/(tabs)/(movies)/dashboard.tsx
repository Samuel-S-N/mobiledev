import { MovieCard } from "@/components/movieCard";
import { getMovies } from "@/services/api_movies";
import { APIMOVIES } from "@/types/api_movie.type";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const [movies, setMovies] = useState<APIMOVIES[]>([]);

  useEffect(() => {
    //COMPLETE O useEffect PARA CARREGAR OS ITEMS NA TELA
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getMovies();
    //COMPLETE O loadMovies UTILIZANDO O useState
    setMovies(data);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ExpoFlix</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <StatusBar style="auto" hidden />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19244B",
    padding: 8,
  },
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 30,
  },
});
