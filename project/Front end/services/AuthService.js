import api from "./api.js";

const AuthService = {
  entrar: (credenciais) => api.post("/auth/login", credenciais),
  cadastrar: (dados) => api.post("/auth/cadastro", dados),
  sair: () => api.post("/auth/logout"),
  obterSessao: () => api.get("/auth/me"),
  solicitarRecuperacaoSenha: (email) => api.post("/auth/recuperar-senha", { email }),
  redefinirSenha: (dados) => api.post("/auth/redefinir-senha", dados),
  verificarEmail: (token) => api.post("/auth/verificar-email", { token }),
  reenviarVerificacao: (email) => api.post("/auth/reenviar-verificacao", { email }),
};

export default AuthService;
export { AuthService };
