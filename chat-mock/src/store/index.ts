import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import chatAIReducer from "./chatAISlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    chatAI: chatAIReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
