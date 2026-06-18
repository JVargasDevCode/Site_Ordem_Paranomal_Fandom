// Serviço para gerenciar teorias e votações

const obterTeorias = () => {
  const teorias = localStorage.getItem("teorias");
  return teorias ? JSON.parse(teorias) : [];
};

const salvarTeoria = (teoria, usuarioId) => {
  const teorias = obterTeorias();
  const novaTeoria = {
    id: Date.now(),
    usuarioId,
    ...teoria,
    fezSentido: 0,
    naoFezSentido: 0,
    votantes: [],
    comentarios: [],
    data: new Date().toLocaleDateString(),
    tipo: "teoria"
  };
  teorias.push(novaTeoria);
  localStorage.setItem("teorias", JSON.stringify(teorias));
  return novaTeoria;
};

const votarTeoria = (teoriaId, voto, usuarioId) => {
  // voto: "sim" ou "nao"
  const teorias = obterTeorias();
  const teoria = teorias.find(t => t.id === teoriaId);
  
  if (teoria) {
    // Verifica se já votou
    if (teoria.votantes.includes(usuarioId)) {
      return { sucesso: false, mensagem: "Você já votou nesta teoria" };
    }

    if (voto === "sim") {
      teoria.fezSentido = (teoria.fezSentido || 0) + 1;
    } else if (voto === "nao") {
      teoria.naoFezSentido = (teoria.naoFezSentido || 0) + 1;
    }
    
    teoria.votantes.push(usuarioId);
    localStorage.setItem("teorias", JSON.stringify(teorias));
  }
  return teoria;
};

const adicionarComentario = (teoriaId, comentario, usuarioId) => {
  const teorias = obterTeorias();
  const teoria = teorias.find(t => t.id === teoriaId);
  
  if (teoria) {
    if (!teoria.comentarios) teoria.comentarios = [];
    teoria.comentarios.push({
      id: Date.now(),
      usuarioId,
      ...comentario,
      data: new Date().toLocaleDateString()
    });
    localStorage.setItem("teorias", JSON.stringify(teorias));
  }
  return teoria;
};

const deletarTeoria = (teoriaId) => {
  let teorias = obterTeorias();
  teorias = teorias.filter(t => t.id !== teoriaId);
  localStorage.setItem("teorias", JSON.stringify(teorias));
};

export { obterTeorias, salvarTeoria, votarTeoria, adicionarComentario, deletarTeoria };
