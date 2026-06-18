import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx"; // Adicionado .jsx
import Footer from "./components/Footer.jsx"; // Adicionado .jsx

import Home from "./pages/Home";
import Teorias from "./pages/Teorias";
import Comunidade from "./pages/Comunidade";
import Persona from "./pages/Persona";
import Temporadas from "./pages/Temporadas";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import Postagens from "./pages/Postagens";
import Produtos from "./pages/Produtos";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teorias" element={<Teorias />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/persona" element={<Persona />} />
          <Route path="/personagens" element={<Persona />} />
          <Route path="/temporadas" element={<Temporadas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/postagens" element={<Postagens />} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;