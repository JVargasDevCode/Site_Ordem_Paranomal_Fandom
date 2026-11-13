import api from "./api.js";

const AdminService = {
  obterDashboard: () => api.get("/admin/dashboard"),
  listarUsuarios: (params) => api.get("/admin/usuarios", { params }),
  atualizarUsuario: (id, dados) =>
    api.patch(`/admin/usuarios/${encodeURIComponent(id)}`, dados),
  listarPersonagens: (params) => api.get("/admin/personagens", { params }),
  criarPersonagem: (dados) => api.post("/admin/personagens", dados),
  atualizarPersonagem: (id, dados) =>
    api.put(`/admin/personagens/${encodeURIComponent(id)}`, dados),
  removerPersonagem: (id) => api.delete(`/admin/personagens/${encodeURIComponent(id)}`),
  listarJogadores: (params) => api.get("/admin/jogadores", { params }),
  criarJogador: (dados) => api.post("/admin/jogadores", dados),
  atualizarJogador: (id, dados) =>
    api.put(`/admin/jogadores/${encodeURIComponent(id)}`, dados),
  removerJogador: (id) => api.delete(`/admin/jogadores/${encodeURIComponent(id)}`),
  listarTemporadas: (params) => api.get("/admin/temporadas", { params }),
  criarTemporada: (dados) => api.post("/admin/temporadas", dados),
  atualizarTemporada: (id, dados) =>
    api.put(`/admin/temporadas/${encodeURIComponent(id)}`, dados),
  removerTemporada: (id) => api.delete(`/admin/temporadas/${encodeURIComponent(id)}`),
  listarTeorias: (params) => api.get("/admin/teorias", { params }),
  moderarTeoria: (id, dados) =>
    api.patch(`/admin/teorias/${encodeURIComponent(id)}`, dados),
  removerTeoria: (id) => api.delete(`/admin/teorias/${encodeURIComponent(id)}`),
  listarPublicacoes: (params) => api.get("/admin/publicacoes", { params }),
  moderarPublicacao: (id, dados) =>
    api.patch(`/admin/publicacoes/${encodeURIComponent(id)}`, dados),
  removerPublicacao: (id) => api.delete(`/admin/publicacoes/${encodeURIComponent(id)}`),
  atualizarCreditos: (dados) => api.put("/admin/creditos", dados),
};

export default AdminService;
export { AdminService };
