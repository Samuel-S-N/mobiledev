import { View, Text, StyleSheet } from "react-native";

type Props = {
  text: string;
  sender: "user" | "bot";
};

export default function MessageBuble({ text, sender }: Props) {
  const isUser = sender === "user";

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.containerUser : styles.containerBot,
      ]}
    >
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}
      >
        <Text style={isUser ? styles.userText : styles.botText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 4,
  },
  //controla o lado da mensagem
  containerUser: {
    alignItems: "flex-end",
  },
  containerBot: {
    alignItems: "flex-start",
  },
  bubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: "75%",
    marginHorizontal: 10,
  },
  userBubble: {
    backgroundColor: "#DCF8C6",
    borderTopRightRadius: 0,
  },
  botBubble: {
    backgroundColor: "#EEE",
    borderTopLeftRadius: 0,
  },
  userText: {
    color: "#000",
  },
  botText: {
    color: "#000",
  },
});
