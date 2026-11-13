import api from "./api.js";

const JogadorService = {
  listar: (params) => api.get("/jogadores", { params }),
  obterPorId: (id) => api.get(`/jogadores/${encodeURIComponent(id)}`),
  buscar: (termo, params = {}) =>
    api.get("/jogadores/busca", { params: { ...params, q: termo } }),
  criar: (dados) => api.post("/jogadores", dados),
  atualizar: (id, dados) => api.put(`/jogadores/${encodeURIComponent(id)}`, dados),
  remover: (id) => api.delete(`/jogadores/${encodeURIComponent(id)}`),
};

export default JogadorService;
export { JogadorService };
