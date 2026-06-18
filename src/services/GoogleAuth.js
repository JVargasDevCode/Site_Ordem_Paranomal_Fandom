// Simulação de autenticação Google (sem backend)
// Em produção, use Firebase ou OAuth real

const simulateGoogleLogin = async () => {
  return {
    nome: "Usuário Google",
    email: "usuario@gmail.com",
    foto: "https://via.placeholder.com/50",
    id: Date.now()
  };
};

const verificarGoogleLogado = () => {
  const usuario = localStorage.getItem("usuarioGoogle");
  return usuario ? JSON.parse(usuario) : null;
};

const fazerLoginGoogle = async () => {
  try {
    const usuario = await simulateGoogleLogin();
    localStorage.setItem("usuarioGoogle", JSON.stringify(usuario));
    return usuario;
  } catch (erro) {
    console.error("Erro ao fazer login com Google:", erro);
    return null;
  }
};

const fazerLogoutGoogle = () => {
  localStorage.removeItem("usuarioGoogle");
  localStorage.removeItem("usuario");
};

export { verificarGoogleLogado, fazerLoginGoogle, fazerLogoutGoogle };
