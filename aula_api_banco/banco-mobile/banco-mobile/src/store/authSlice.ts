import { login } from "@/services/api";
import { Usuario } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {login as loginApi} from "../services/api"

const STORAGE_KEY = "@banco:user"

interface AuthState {
    usuario: Usuario | null;
    carregando: boolean;
}

const initialState: AuthState = {
    usuario: null,
    carregando: true,
}

export const carregarSessao = createAsyncThunk(
    "auth/carregarSessao",
        async () => {
            const usuarioSalvo = await AsyncStorage.getItem(STORAGE_KEY);

            if (!usuarioSalvo) return null

            return JSON.parse(usuarioSalvo) as Usuario;
        }
);



export const loginUsuario = createAsyncThunk(
    "auth/loginUsuario",
    async ({ email, senha }: { email: string; senha: string }) => {
        const data = await loginApi(email, senha);
        
        if(data.error) {
            throw new Error(data.error);
        }

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data.usuario));

        return data.usuario as Usuario;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}, 

    extraReducers: (builder) => {
        builder
        .addCase(carregarSessao.pending, (state) => {
            state.carregando = true;
        })
        .addCase(carregarSessao.fulfilled, (state, action) => {
            state.usuario = action.payload;
            state.carregando = false;
        })
        .addCase(carregarSessao.rejected, (state) => {
            state.carregando = false;
        });
    }
})

export default authSlice.reducer;
