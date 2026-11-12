import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export const PersonagemService = {
    async listar() {
        const response = await api.get('/personagens');
        return response.data;
    },
    async criar(dados) {
        const response = await api.post('/personagens', dados);
        return response.data;
    },
    async deletar(id) {
        await api.delete(`/personagens/${id}`);
    }
};