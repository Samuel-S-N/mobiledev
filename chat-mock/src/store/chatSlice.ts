import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

type ChatState = {
  messages: Message[];
};

const initialState: ChatState = {
  messages: [],
};

//THUNK (ASSÍNCRONO COM IA)

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now().toString(),
        text: action.payload,
        sender: "user",
      });
    },

    receiveMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now().toString(),
        text: action.payload,
        sender: "bot",
      });
    },

    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const { sendMessage, receiveMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
