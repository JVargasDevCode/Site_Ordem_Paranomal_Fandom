import api from "./api.js";

const UsuarioService = {
  listar: (params) => api.get("/usuarios", { params }),
  obterPorId: (id) => api.get(`/usuarios/${encodeURIComponent(id)}`),
  obterPerfil: () => api.get("/usuarios/me"),
  atualizarPerfil: (dados) => api.patch("/usuarios/me", dados),
  atualizarAvatar: (arquivo) => {
    const body = new FormData();
    body.append("avatar", arquivo);
    return api.patch("/usuarios/me/avatar", body);
  },
  listarConquistas: (id) => api.get(`/usuarios/${encodeURIComponent(id)}/conquistas`),
  atualizarStatus: (id, status) =>
    api.patch(`/usuarios/${encodeURIComponent(id)}/status`, { status }),
  atualizarPapel: (id, papel) =>
    api.patch(`/usuarios/${encodeURIComponent(id)}/papel`, { papel }),
};

export default UsuarioService;
export { UsuarioService };
