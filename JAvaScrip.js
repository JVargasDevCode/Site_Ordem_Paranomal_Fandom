document.addEventListener("DOMContentLoaded", function() {
    carregarLista();

    const form = document.getElementById("form");
    const cpfInput = document.getElementById("cpf");

    if (cpfInput) {
        cpfInput.addEventListener("input", function() {
            this.value = this.value.replace(/[^0-9]/g, "");
        });
    }

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const cpf = document.getElementById("cpf").value;
            const idade = document.getElementById("idade").value;
            const msg = document.getElementById("msg");

            if (!validarCPF(cpf)) {
                msg.innerText = "❌ CPF INVÁLIDO!";
                msg.style.color = "#ff4444";
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            usuarios.push({ nome, email, cpf, idade });

            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            msg.innerText = "✅ AGENTE RECRUTADO!";
            msg.style.color = "#38bdf8";

            form.reset();

            carregarLista();
        });
    }
});


function carregarLista() {
    const tabela = document.getElementById("tabelaAgentes");
    if (!tabela) return;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    tabela.innerHTML = "";

    usuarios.forEach((u, i) => {
        tabela.innerHTML += `
        <tr>
            <td>${u.nome}</td>
            <td>${u.email}</td>
            <td>${u.cpf}</td>
            <td>${u.idade}</td>
            <td>
                <button onclick="excluirAgente(${i})" style="color:red;">
                    Remover
                </button>
            </td>
        </tr>
        `;
    });
}

function excluirAgente(i) {
    if (!confirm("Tem certeza que deseja excluir este agente?")) {
        return; 
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.splice(i, 1);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    carregarLista();
}

function limparTudo() {
    if (confirm("Tem certeza que deseja apagar tudo?")) {
        localStorage.removeItem("usuarios");
        carregarLista();
    }
}

// =====================
// VALIDAR CPF
// =====================
function validarCPF(cpf) {
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);

    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    return resto === parseInt(cpf[10]);
}
function excluirAgente(indice) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    
    usuarios.splice(indice, 1);
    
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    carregarLista();
}

function limparTudo() {
    if (confirm("Deseja apagar todos os recrutas da base de dados?")) {
        localStorage.removeItem("usuarios");
        carregarLista();
    }
}

// Algoritmo de validação de CPF
function validarCPF(cpf) {
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    let cpfs = cpf.split("");
    let validator = cpfs.filter((x, index) => index >= 9).map(x => parseInt(x));
    let check1 = 0, check2 = 0;
    for (let i = 0; i < 9; i++) check1 += parseInt(cpfs[i]) * (10 - i);
    check1 = (check1 * 10) % 11;
    if (check1 === 10 || check1 === 11) check1 = 0;
    if (check1 !== validator[0]) return false;
    for (let i = 0; i < 10; i++) check2 += parseInt(cpfs[i]) * (11 - i);
    check2 = (check2 * 10) % 11;
    if (check2 === 10 || check2 === 11) check2 = 0;
    if (check2 !== validator[1]) return false;
    return true;
}

// Executa a carga sempre que a página abrir
if (document.getElementById("tabela")) {
    carregarLista();
}

function excluirAgente(i) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    usuarios.splice(i, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    carregarLista();
}

// Inicia a lista automaticamente se estiver na página certa
if (document.getElementById("tabela")) {
    carregarLista();
}
function excluir(i){
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  usuarios.splice(i,1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  carregar();
}

function limpar(){
  localStorage.clear();
  carregar();
}

carregar();

// CEP
let cepInput = document.getElementById("cep");

if(cepInput){
  cepInput.addEventListener("blur", function(){
    fetch(`https://viacep.com.br/ws/${this.value}/json/`)
    .then(r=>r.json())
    .then(d=>{
      if(d.erro) return alert("CEP inválido");

      rua.innerText = "Rua: " + d.logradouro;
      bairro.innerText = "Bairro: " + d.bairro;
      cidade.innerText = "Cidade: " + d.localidade;
      estado.innerText = "Estado: " + d.uf;
    });
  });
}