import api from "./api.js";

const PostagemService = {
  listar: (params) => api.get("/postagens", { params }),
  obterPorId: (id) => api.get(`/postagens/${encodeURIComponent(id)}`),
  criar: (dados) => api.post("/postagens", dados),
  atualizar: (id, dados) => api.put(`/postagens/${encodeURIComponent(id)}`, dados),
  remover: (id) => api.delete(`/postagens/${encodeURIComponent(id)}`),
};

export default PostagemService;
export { PostagemService };
