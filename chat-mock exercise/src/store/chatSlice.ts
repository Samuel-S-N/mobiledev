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

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now().toString(),
        text: action.payload,
        sender: "user"
      })
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

export const { addMessage, receiveMessage, clearChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
