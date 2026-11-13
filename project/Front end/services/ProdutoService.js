import api from "./api.js";

const ProdutoService = {
  listar: (params) => api.get("/produtos", { params }),
  obterPorId: (id) => api.get(`/produtos/${encodeURIComponent(id)}`),
};

export default ProdutoService;
export { ProdutoService };
