import api from "./api.js";

const PersonagemService = {
  listar: (params) => api.get("/personagens", { params }),
  obterPorId: (id) => api.get(`/personagens/${encodeURIComponent(id)}`),
  buscar: (termo, params = {}) =>
    api.get("/personagens/busca", { params: { ...params, q: termo } }),
  criar: (dados) => api.post("/personagens", dados),
  atualizar: (id, dados) => api.put(`/personagens/${encodeURIComponent(id)}`, dados),
  remover: (id) => api.delete(`/personagens/${encodeURIComponent(id)}`),
};

export default PersonagemService;
export { PersonagemService };
