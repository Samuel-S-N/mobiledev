import { Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";

import { store } from "../store";
import { carregarSessao } from "../store/authSlice";

function AppLayout() {
  useEffect(() => {
    store.dispatch(carregarSessao());
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}