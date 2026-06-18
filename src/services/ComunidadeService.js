// Serviço para gerenciar posts de comunidade

const obterPosts = () => {
  const posts = localStorage.getItem("postsComunidade");
  return posts ? JSON.parse(posts) : [];
};

const salvarPost = (post, usuarioId) => {
  const posts = obterPosts();
  const novoPost = {
    id: Date.now(),
    usuarioId,
    ...post,
    curtidas: 0,
    usuariosCurtiram: [],
    data: new Date().toLocaleDateString(),
    tipo: "comunidade"
  };
  posts.push(novoPost);
  localStorage.setItem("postsComunidade", JSON.stringify(posts));
  return novoPost;
};

const curtirPost = (postId, usuarioId) => {
  const posts = obterPosts();
  const post = posts.find(p => p.id === postId);

  if (post) {
    post.usuariosCurtiram = post.usuariosCurtiram || [];
    if (post.usuariosCurtiram.includes(usuarioId)) {
      // Já curtiu: remover curtida (toggle)
      post.usuariosCurtiram = post.usuariosCurtiram.filter((id) => id !== usuarioId);
      post.curtidas = Math.max(0, (post.curtidas || 1) - 1);
    } else {
      // Adicionar curtida
      post.usuariosCurtiram.push(usuarioId);
      post.curtidas = (post.curtidas || 0) + 1;
    }

    localStorage.setItem("postsComunidade", JSON.stringify(posts));
  }
  return post;
};

const deletarPost = (postId) => {
  let posts = obterPosts();
  posts = posts.filter(p => p.id !== postId);
  localStorage.setItem("postsComunidade", JSON.stringify(posts));
};

export { obterPosts, salvarPost, curtirPost, deletarPost };
