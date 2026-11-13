import api from "./api.js";

const CurtidaService = {
  curtir: (tipo, id) =>
    api.post(`/${encodeURIComponent(tipo)}/${encodeURIComponent(id)}/curtidas`),
  descurtir: (tipo, id) =>
    api.delete(`/${encodeURIComponent(tipo)}/${encodeURIComponent(id)}/curtidas`),
  obterStatus: (tipo, id) =>
    api.get(`/${encodeURIComponent(tipo)}/${encodeURIComponent(id)}/curtidas/status`),
};

export default CurtidaService;
export { CurtidaService };
