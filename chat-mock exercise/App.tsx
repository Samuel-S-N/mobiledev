import { Provider } from "react-redux";
import ChatScreen from "./src/app/chat";
import { store } from "./src/store";
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
