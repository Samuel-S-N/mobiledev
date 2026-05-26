// gerar id simples
export function gerarId() {
  return Math.random().toString(36).substring(2, 9);
}
