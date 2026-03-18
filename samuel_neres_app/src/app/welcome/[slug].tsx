import { useLocalSearchParams } from "expo-router";


import { View, Text, StyleSheet } from "react-native";

export default function About() {
{
 /* O useLocalSearchParams é uma função do expo-router que recebe os parametros
de url*/
}
    const { slug } = useLocalSearchParams<{ slug: string }>();

    return (
        <View style={styles.container}>
            {/*DEIXE A TELA COM O MÍNIMO DE ESTILO POSSÍVEL OU IGUAL A DEMONSTRAÇÃO. E
MOSTRE O NOME DO USUÁRIO NA TELA*/} 
            <Text style={styles.textOne}>
                Olá, seja muito bem vindo ao React Native Expo!
            </Text>
            <Text style={styles.textTwo}>Parabéns, {slug}!</Text>
            <Text style={styles.textThree}>Você concluiu o primeiro teste.</Text>
        </View>
);
}

const styles = StyleSheet.create({

    container: {
         flex: 1,
},
textOne: {
 fontSize: 20,
 fontWeight: "bold",
 color: "black"
},
textTwo: {
fontSize: 20,
 fontWeight: "bold",
 color: "black"
},
textThree:{
fontSize: 20,
 fontWeight: "bold",
 color: "black"
}
});
