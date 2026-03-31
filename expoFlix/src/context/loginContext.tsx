import { Href, useRouter } from "expo-router";
import { ImageSourcePropType } from "react-native";
import { Children, createContext, ReactNode, useState } from "react";
import { EmailRegex } from "@/utils/email-regex";

type User = {
    name: string;
    email: string;
    password: string;
    image: ImageSourcePropType;
}

type LoginContextType = {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    isErro: String;
}

export const LoginContext = createContext({} as LoginContextType);

export const LoginProvider = ({Children}:{Children: ReactNode}) => {

    const [user, setUser] = useState<User|null>(null);
    const [isErro, setIsErro] = useState<String>("");

    const router = useRouter();

    const login = (email: string, password: string) => {
        if(email === "" || password === "") {
            setIsErro("Preencha todos os campos");
            return;
        }
        const isEmail = EmailRegex(email);
        if(!isEmail) {
            setIsErro("Email inválido");
            return;
        }
        if(password.length < 6) {
            setIsErro("A senha deve conter no mínimo 6 caracteres");
            return;
        }
        if (email === "admin@admin.com" && password === "admin") {
            setIsErro("Usuário ou senha inválidos");
            return;
        }
        setIsErro("");
        setUser({
            name: "Admin",
            email,
            password,
            image: require("../../assets/images/punpun.jpg")
        });
        router.replace("/dashboard" as Href);
}

    const logout = () => {
        setUser(null);
        setIsErro("");
    }

    return (
        <LoginContext.Provider value={{ user, login, logout, isErro }}>
            {Children}
        </LoginContext.Provider>
    );
}