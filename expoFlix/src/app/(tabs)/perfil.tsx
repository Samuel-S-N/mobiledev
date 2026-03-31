import { LoginContext } from "@/context/loginContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Perfil() {
  const router = useRouter();

  const {user, logout} = useContext(LoginContext)

  return (
    <View style={styles.container}>
      <Text style={styles.perfil}>Perfil</Text>
      <View style={styles.perfilContainer}>
        <Image
          style={styles.avatar}
          resizeMode="cover"
          source={user?.image}
        />
        <Text style={styles.text}>Nome: Punpun</Text>
        <Text style={styles.text}>Email: boanoite.punpun@gmail.com</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.btnTitle}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19244B",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  perfil: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "600",
  },
  perfilContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#fff",
    width: 300,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#19244b",
  },
});

