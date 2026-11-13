import { useEffect, useState } from "react";
import CardProduto from "../../components/CardProduto.jsx";
import ProdutoService from "../../services/ProdutoService.js";

function getProducts(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.produtos)) return response.produtos;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para o acervo de produtos.");
}

export default function Produtos() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    ProdutoService.listar()
      .then((response) => {
        const result = getProducts(response);
        if (active) setProducts(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar o acervo de produtos.", error);
          setErrorMessage(error.message || "Não foi possível consultar os produtos.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="archive-list-page">
      <header className="archive-list-header">
        <p className="archive-label">Acervo de produtos // Parceiros e referências</p>
        <h1>Produtos</h1>
        <p>Itens relacionados ao universo e à comunidade. Disponibilidade e condições de compra são definidas pelos respectivos fornecedores.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {isLoading ? (
        <p className="archive-loading" role="status">Consultando acervo...</p>
      ) : products.length ? (
        <div className="archive-card-grid">
          {products.map((product) => (
            <CardProduto key={product.id ?? product.slug ?? product.nome} produto={product} />
          ))}
        </div>
      ) : (
        <p className="archive-empty">Nenhum produto foi publicado no acervo.</p>
      )}
    </div>
  );
}
