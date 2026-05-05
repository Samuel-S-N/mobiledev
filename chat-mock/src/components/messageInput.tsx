import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { sendMessageAsyncAI } from "../store/chatAISlice";

export default function messageInput() {
  const [text, setText] = useState("");


  const dispatch = useDispatch<AppDispatch>();


  const handleSend = () => {
    if (!text.trim()) return;


    dispatch(sendMessageAsyncAI(text));  //chama IA via redux
    
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
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendText}>Enviar</Text>
      </TouchableOpacity>
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
  sendButton: {
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
});
