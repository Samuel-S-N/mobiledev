import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  FlatList,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import MessageBubble from "../components/messageBubble";
import MessageInput from "../components/messageInput";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
  const messages = useSelector((state: RootState) => state.chat.messages);

  const flatListRef = useRef<FlatList>(null);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MessageBubble text={item.text} sender={item.sender} />
            )}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            contentContainerStyle={{ padding: 10 }}
            keyboardShouldPersistTaps="handled"
          />
          <View style={styles.inputContainer}>
            <MessageInput />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
});
