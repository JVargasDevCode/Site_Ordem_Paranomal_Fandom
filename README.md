# Portal Ordem Paranormal

## 📖 Sobre o Projeto

O Portal Ordem Paranormal é um site desenvolvido em React com o objetivo de reunir informações sobre o universo de Ordem Paranormal em um único lugar.

O projeto foi criado como Trabalho Final de Front-End, aplicando conceitos de HTML, CSS, JavaScript, React e consumo de APIs.

---

## 🎯 Objetivo

Criar uma plataforma interativa para fãs de Ordem Paranormal, permitindo o acesso a informações sobre personagens, temporadas, comunidade, teorias e produtos oficiais.

---

## 🛠 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* React
* React Router DOM
* Vite
* LocalStorage
* APIs Externas

---

## 📂 Estrutura do Projeto

### Home

Página inicial do portal contendo destaques e acesso rápido às demais áreas do sistema.

### Personagens

Área dedicada aos personagens de Ordem Paranormal.

Funcionalidades:

* Imagem do personagem
* Nome
* Status (Vivo ou Morto)
* Temporada de origem
* História (Lore)
* Informações adicionais

### Temporadas

Área que apresenta todas as temporadas oficiais.

Funcionalidades:

* Capa da temporada
* Nome da temporada
* Ano de lançamento
* Descrição
* Link direto para a playlist oficial no YouTube

### Comunidade

Espaço para interação dos fãs.

Funcionalidades:

* Publicação de Fanarts
* Publicação de Cosplays
* Exibição do @ do criador
* Curtidas
* Organização dos conteúdos

### Teorias

Área para compartilhamento de teorias criadas pela comunidade.

Funcionalidades:

* Título da teoria
* Autor
* Descrição
* Curtidas
* Comentários futuros

### Login e Cadastro

Sistema de autenticação de usuários.

Funcionalidades:

* Cadastro
* Login
* Perfil do usuário
* Integração futura com contas Google

### Perfil

Área do usuário.

Funcionalidades:

* Foto de perfil
* Nome de usuário
* Publicações realizadas
* Teorias criadas

### Produtos

Área dedicada aos produtos oficiais relacionados ao universo de Ordem Paranormal.

Funcionalidades:

* HQs
* Livros de regras
* Campanhas prontas
* Materiais publicados pela Jambô Editora
* Links para acesso aos produtos

---

## 💾 Armazenamento

O projeto utiliza LocalStorage para armazenar informações localmente.

Exemplos:

* Login do usuário
* Teorias criadas
* Fanarts publicadas
* Cosplays enviados
* Curtidas

---

## 📌 Funcionalidades Implementadas

✅ Navegação entre páginas

✅ Sistema de componentes React

✅ Cards de personagens

✅ Cards de temporadas

✅ Cards de teorias

✅ Cards da comunidade

✅ Sistema de rotas

✅ Estrutura para login

✅ Integração com playlists do YouTube

✅ Exibição de produtos oficiais

✅ Layout responsivo

---
## Instalação e Execução do projeto

Antes de executar é necessário ter instalado:

* Node.js (versão 18 ou superior recomendada)
* npm (gerenciador de pacotes do Node.js)
* Git (opcional, para clonar o repositório)

### Passo 1 - Clonar o repositório

```bash
git clone https://github.com/Seu nome de usuario/Site_Ordem_Paranomal_Fandom
```

### Passo 2 - Acessar a pasta do projeto

```bash
cd Site_Ordem_Paranomal_Fandom
```

### Passo 3 - Instalar as dependências

```bash
npm install
```

### Passo 4 - Executar o projeto

```bash
npm run dev
```


### Passo 5 - Abrir no navegador

Acesse o endereço exibido no terminal, normalmente:


```text
http://localhost:5173
```

### Passo 6 - Encerrar a aplicação

Para interromper a execução do projeto, utilize no terminal:

```text
CTRL + C
```
---
### 📂 Estrutura do Projeto

```text
src
├── capas
│   ├── calamidade.jpg
│   ├── desconjuração.jpg
│   ├── Iniciação.jpg
│   ├── segredo na floresta.jpg
│   ├── segredo na ilha.jpg
│   └── Sinais do outro lado.jpg
│
├── components
│   ├── CardComunidade.jsx
│   ├── CardComunidadeNova.jsx
│   ├── CardPersonagem.jsx
│   ├── CardTemporada.jsx
│   ├── CardTeoria.jsx
│   ├── CardTeoriaNova.jsx
│   ├── Footer.jsx
│   └── Navbar.jsx
│
├── data
│   └── temporada
│
├── pages
│   ├── Cadastro.jsx
│   ├── Comunidade.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Perfil.jsx
│   ├── Persona.jsx
│   ├── Postagens.jsx
│   ├── Produtos.jsx
│   ├── Temporadas.jsx
│   └── Teorias.jsx
│
├── personagens
│   ├── Arthur.jpeg
│   ├── Carina_Leona.jpeg
│   ├── Dante..jpeg
│   ├── Joui.jpeg
│   ├── Kaiser..jpeg
│   ├── Liz..jpeg
│   ├── Tiago..jpeg
│   └── personagem.js
│
├── services
│   ├── AuthService.js
│   ├── ComunidadeService.js
│   ├── GoogleAuth.js
│   ├── MediaStorageService.js
│   ├── PostagemService
│   ├── Storage.jv
│   ├── TeoriasService.js
│   └── UsuarioService.js
│
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```
---
### 🌐 Funcionamento e Aplicação no Mundo Real (Front-End Only)

Este é um projeto desenvolvido **100% no ecossistema Front-End**, o que significa que toda a lógica de negócios, gerenciamento de estado e persistência de dados acontecem diretamente no navegador do usuário (Client-Side). 

No mercado de desenvolvimento moderno, aplicações puramente Front-End são extremamente comuns e se aplicam nos seguintes cenários reais:

## 1. Aplicações Baseadas em LocalStorage (Offline-First)
Sem um banco de dados tradicional, o projeto utiliza o navegador para salvar informações. O arquivo `Storage.jv` (ou LocalStorage) funciona como o "banco de dados" local do usuário.
* **Aplicação Real:** Aplicativos de produtividade (como o **Trello** ou **Notion** em modo offline), gerenciadores de tarefas (To-Do lists) e ferramentas de notas utilizam essa exata abordagem para salvar as preferências e dados do usuário localmente sem gastar com servidores externos.

## 2. Integração com APIs Públicas ou Prontas (Serverless / BaaS)
Mesmo sem um Back-End próprio, a pasta `services` (como o `GoogleAuth.js` e `TeoriasService.js`) permite que o app se conecte diretamente a serviços de terceiros.
* **Aplicação Real:** É o conceito de **BaaS (Backend as a Service)**. Portais de conteúdo e fóruns modernos usam o Front-End para se conectar diretamente ao **Firebase**, **Supabase** ou APIs públicas. Toda a autenticação do Google e a postagem de dados podem ser enviadas diretamente para essas nuvens sem que você precise programar um servidor do zero.

## 3. Sites Estáticos Dinâmicos (JAMstack)
Plataformas de conteúdo que não mudam o tempo todo (como blogs de notícias, wikis de jogos e portfólios) se beneficiam muito dessa estrutura.
* **Aplicação Real:** Sites como **Fandom Wiki** ou blogs de RPG usam arquivos de dados estáticos (como arquivos JSON na pasta `data/temporada`) para carregar o conteúdo instantaneamente. Isso torna o carregamento extremamente rápido, seguro contra ataques de invasão de banco de dados e muito barato para manter hospedado (em plataformas como Vercel or Netlify).

## 4. Protótipos de Alta Fidelidade (MVP - Minimum Viable Product)
Isso seria um MVP para testarmos como pode ficar no futuro com um Banco de Dados.
* **Aplicação Real:** Um MVP (Mínimo Produto Viável) serve para validar se os usuários gostam da interface, do design e do fluxo de navegação de uma rede social de RPG antes de contratar uma equipe de Back-End.

---

### 🛠️ Mecanismos Técnicos Utilizados
* **Persistência Local:** Utilização da Web Storage API (LocalStorage/SessionStorage) para simular o comportamento de um banco de dados na máquina do cliente.
* **Roteamento Dinâmico:** Gerenciamento de navegação entre as páginas (`Home`, `Comunidade`, `Perfil`) sem recarregar o navegador, controlando o estado da sessão localmente.
* **Simulação de Estados:** Criação de fluxos de login e cadastro mockados (simulados) para validação de experiência do usuário (UX).
---
## 👨‍💻 Equipe

### Júlio Vargas

Responsável por:

* Estrutura React
* Lógica do sistema
* Componentes
* Rotas
* Integrações
* Organização do projeto

### Davi

Responsável por:

* Conteúdo
* Pesquisa
* Testes
* Revisão
* Organização visual
* Auxílio na documentação

### Viel

Responsável por:

- Auxílio na elaboração do README
- Auxílio na elaboração do relatório
- Revisão textual da documentação
- Organização da apresentação do projeto
- Apoio na descrição das funcionalidades e objetivos do sistema


---
# 🤝 Colaboração

O projeto foi desenvolvido de forma colaborativa, utilizando GitHub para controle de versões e organização do código.

Cada integrante contribuiu em áreas específicas do desenvolvimento, documentação e apresentação do sistema, garantindo a construção de uma aplicação organizada e alinhada aos objetivos do trabalho final.

---

## 🚀 Futuras Melhorias

* Comentários em teorias
* Sistema completo de curtidas
* Favoritos
* Login Google
* Banco de dados
* Editar/excluir postagens
* Sistema puxar a conta do Tiktok, Twiter ou Instagram automaticamente
* Perfil avançado
* Busca de personagens
* Busca de temporadas
* Colocar os de mais personagens, e os NPCs
* Por o jogo e link de compra com as opções das plataformas (steam, XBOX, Nintendo e etc)

---

## 📜 Conclusão

O Portal Ordem Paranormal foi desenvolvido para demonstrar conhecimentos em desenvolvimento Front-End utilizando React, componentes reutilizáveis, roteamento, organização de código e experiência do usuário, oferecendo uma plataforma temática voltada para a comunidade de fãs de Ordem Paranormal.
