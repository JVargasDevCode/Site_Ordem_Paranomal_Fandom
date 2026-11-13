import api from "./api.js";

const TemporadaService = {
  listar: (params) => api.get("/temporadas", { params }),
  obterPorId: (id) => api.get(`/temporadas/${encodeURIComponent(id)}`),
  criar: (dados) => api.post("/temporadas", dados),
  atualizar: (id, dados) => api.put(`/temporadas/${encodeURIComponent(id)}`, dados),
  remover: (id) => api.delete(`/temporadas/${encodeURIComponent(id)}`),
};

export default TemporadaService;
export { TemporadaService };
