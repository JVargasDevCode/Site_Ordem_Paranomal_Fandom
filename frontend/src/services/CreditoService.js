import api from "./api.js";

const CreditoService = {
  listar: (params) => api.get("/creditos", { params }),
};

export default CreditoService;
export { CreditoService };
