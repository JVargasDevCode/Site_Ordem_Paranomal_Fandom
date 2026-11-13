import api from "./api.js";

const TeoriasService = {
  listar: (params) => api.get("/teorias", { params }),
  obterPorId: (id) => api.get(`/teorias/${encodeURIComponent(id)}`),
  criar: (dados) => api.post("/teorias", dados),
  atualizar: (id, dados) => api.put(`/teorias/${encodeURIComponent(id)}`, dados),
  avaliar: (id, avaliacao) =>
    api.post(`/teorias/${encodeURIComponent(id)}/avaliacoes`, { avaliacao }),
  remover: (id) => api.delete(`/teorias/${encodeURIComponent(id)}`),
};

export default TeoriasService;
export { TeoriasService };
