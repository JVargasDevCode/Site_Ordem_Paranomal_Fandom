// Serviço para obter dados de usuários
import { usuariosDB } from "./AuthService";

const obterUsuarioPorId = (usuarioId) => {
  const usuarios = usuariosDB();
  return usuarios.find(u => u.id === usuarioId);
};

export { obterUsuarioPorId };
