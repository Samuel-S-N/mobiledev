import { useState } from "react";
import { useDispatch } from "react-redux";
import { receiveMessage, addMessage } from "../store/chatSlice";
import { Button, TextInput, View, StyleSheet } from "react-native";

export default function messageInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSend = () => {
    if (!text.trim()) return;


    //simula resposta do bot
    setTimeout(() => {
    dispatch(receiveMessage("Olá, como posso te ajudar?"))
    }, 2000);

    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Digite uma mensagem"
        style={styles.input}
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />
      <Button title="Enviar" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginRight: 10,
    padding: 8,
    borderRadius: 5,
  },
});
