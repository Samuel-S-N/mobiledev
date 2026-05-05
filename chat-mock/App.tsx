import { Provider } from "react-redux";
import { store } from "./src/store";
import ChatScreen from "./src/app/chat";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ChatScreen />
      </Provider>
    </SafeAreaProvider>
  );
}
