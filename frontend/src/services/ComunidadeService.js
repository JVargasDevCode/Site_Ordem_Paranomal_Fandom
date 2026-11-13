import api from "./api.js";

const ComunidadeService = {
  listar: (params) => api.get("/comunidade", { params }),
  obterResumo: () => api.get("/comunidade/resumo"),
  obterMembros: (params) => api.get("/comunidade/membros", { params }),
};

export default ComunidadeService;
export { ComunidadeService };
