// Sistema de autenticação simples com localStorage

const usuariosDB = () => {
  const usuarios = localStorage.getItem("usuarios");
  return usuarios ? JSON.parse(usuarios) : [];
};

const salvarUsuarios = (usuarios) => {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

const registrarUsuario = (nome, email, senha) => {
  const usuarios = usuariosDB();
  
  // Verifica se email já existe
  if (usuarios.find(u => u.email === email)) {
    return { sucesso: false, mensagem: "Email já cadastrado" };
  }

  const novoUsuario = {
    id: Date.now(),
    nome,
    email,
    senha, // Em produção, usar bcrypt!
    ativo: true,
    foto: "https://via.placeholder.com/100?text=" + encodeURIComponent(nome),
    dataCriacao: new Date().toLocaleDateString()
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);
  return { sucesso: true, usuario: novoUsuario };
};

const emitAuthChange = () => {
  window.dispatchEvent(new Event("authChange"));
};

const fazerLogin = (email, senha) => {
  const usuarios = usuariosDB();
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    emitAuthChange();
    return { sucesso: true, usuario };
  }

  return { sucesso: false, mensagem: "Email ou senha incorretos" };
};

const verificarLogado = () => {
  const usuario = localStorage.getItem("usuarioLogado");
  return usuario ? JSON.parse(usuario) : null;
};

const atualizarUsuario = (dadosAtualizados) => {
  const usuarios = usuariosDB();
  const index = usuarios.findIndex(u => u.id === dadosAtualizados.id);
  
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...dadosAtualizados };
    salvarUsuarios(usuarios);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[index]));
    emitAuthChange();
    return usuarios[index];
  }
  return null;
};

const fazerLogout = () => {
  localStorage.removeItem("usuarioLogado");
  emitAuthChange();
};

export { registrarUsuario, fazerLogin, verificarLogado, atualizarUsuario, fazerLogout, usuariosDB };
