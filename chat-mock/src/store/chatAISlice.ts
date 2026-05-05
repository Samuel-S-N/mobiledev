import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

type ChatState = {
  messages: Message[];
  loading: boolean;
  error: string | null;
};

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

export const sendMessageAsyncAI = createAsyncThunk(
  "chatAI/sendMessage",
  async (message: string) => {
    const { askTutor } = await import("../services/askTutor.service");
    return askTutor(message);
  }
);

const chatAISlice = createSlice({
  name: "chatAI",
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

  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsyncAI.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        state.messages.push({
          id: Date.now().toString(),
          text: action.meta.arg,
          sender: "user",
        });
        state.messages.push({
          id: (Date.now() + 1).toString(),
          text: "Digitando...",
          sender: "bot",
        });
      })
      .addCase(sendMessageAsyncAI.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = state.messages.filter(
          (msg) => msg.text !== "Digitando..."
        );
        state.messages.push({
          id: Date.now().toString(),
          text: action.payload,
          sender: "bot",
        });
      })
      .addCase(sendMessageAsyncAI.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao obter resposta da IA";

        state.messages = state.messages.filter(
          (msg) => msg.text !== "Digitando..."
        );
        state.messages.push({
          id: Date.now().toString(),
          text: "Erro ao responder",
          sender: "bot",
        });
      });
  },
});

export const { sendMessage, receiveMessage, clearChat } = chatAISlice.actions;
export default chatAISlice.reducer;
