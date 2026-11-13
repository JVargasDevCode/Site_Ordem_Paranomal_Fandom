import api from "./api.js";

const FavoritoService = {
  listar: (params) => api.get("/favoritos", { params }),
  adicionar: (tipo, id) =>
    api.post("/favoritos", { tipo, itemId: id }),
  remover: (tipo, id) =>
    api.delete(`/favoritos/${encodeURIComponent(tipo)}/${encodeURIComponent(id)}`),
  obterStatus: (tipo, id) =>
    api.get(`/favoritos/${encodeURIComponent(tipo)}/${encodeURIComponent(id)}/status`),
};

export default FavoritoService;
export { FavoritoService };
