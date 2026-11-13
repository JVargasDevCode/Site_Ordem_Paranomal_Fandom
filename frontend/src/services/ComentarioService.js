import api from "./api.js";

const ComentarioService = {
  listar: (tipo, id, params) =>
    api.get(`/${encodeURIComponent(tipo)}/${encodeURIComponent(id)}/comentarios`, { params }),
  criar: (tipo, id, dados) =>
    api.post(`/${encodeURIComponent(tipo)}/${encodeURIComponent(id)}/comentarios`, dados),
  atualizar: (id, dados) =>
    api.put(`/comentarios/${encodeURIComponent(id)}`, dados),
  remover: (id) => api.delete(`/comentarios/${encodeURIComponent(id)}`),
};

export default ComentarioService;
export { ComentarioService };
