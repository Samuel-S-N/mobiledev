import api from "./api.service";

const TUTOR_MODEL = process.env.EXPO_PUBLIC_GROQ_MODEL;
const TUTOR_PROMPT = `
Você é um professor de programação que está ajudando um aluno a aprender a programar.
Você deve responder as perguntas do aluno de forma clara, objetiva, didática e progressiva.

Sempre: 
- Explique como se fosse para um iniciante
- de exemplos práticos
- Se for exercício, não de a resposta direto.
- se for correção, explique o erro e como corrigir.
.

`;

export const askTutor = async(message: string): Promise<string> =>  {
    try { 
        const response = await api.post("/chat/completions", {
            model: TUTOR_MODEL,
            messages: [
                {
                    role: "system",
                    content: TUTOR_PROMPT
                },
                {
                    role: "user",
                    content: message
                }
            ]
        })

        const text = response.data?.choices?.[0]?.message?.content;

        if (!text) {
            throw new Error("Não foi possível obter a resposta do tutor");
        }

        return text;

    } catch (error) {
        console.error("Erro ao buscar tutor:", error);
        throw error;
    }
}