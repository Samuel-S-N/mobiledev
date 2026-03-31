import { InputComponent } from "@/components/inputComponent";
import { LoginContext } from "@/context/loginContext";
import { EmailRegex } from "@/utils/email-regex";
import { useRouter, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<string>("");

  const router = useRouter();

  const { login, isErro} = useContext(LoginContext);

  const handlerLogin = () => {
    if (email === "" || password === "") {
      setIsError("Campos não podem ficar vazios.");
      return;
    }
    const isEmail = EmailRegex(email);

    if (!isEmail) {
      setIsError("Email precisa ser válido");
      return;
    }
    if (password.length < 6) {
      setIsError("Senha deve ter minimo de 6 caracteres");
      return;
    }
    if (
      email !== process.env.EXPO_PUBLIC_EMAIL ||
      password !== process.env.EXPO_PUBLIC_PASSWORD
    ) {
      setIsError("Usuário e/ou Senha incorretos.");
      return;
    }
    setIsError("");
    router.replace("/dashboard" as Href);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ExpoFlix</Text>
      <InputComponent
        label="Email"
        placeholder="Digite o Email"
        type="email-address"
        value={email}
        setValue={setEmail}
      />
      <InputComponent
        label="Senha"
        placeholder="Digite a Senha"
        type="default"
        value={password}
        setValue={setPassword}
      />
      {isError && <Text style={styles.errorMessage}>{isError}</Text>}
      <TouchableOpacity style={styles.button} onPress={handlerLogin}>
        <Text style={styles.buttonTitle}>Entrar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#19244B",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "white",
    width: 300,
    height: 40,
    padding: 4,
    borderWidth: 1,
    borderColor: "#6B76A0",
    borderRadius: 8,
  },
  errorMessage: {
    alignSelf: "center",
    color: "#F5482F",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#86A16C",
    width: 300,
    height: 40,
    marginTop: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
  },
});
