const transacaoUL = document.querySelector("#transactions");
const salario = document.querySelector("#balance");
const despesasTotal = document.querySelector("#money-minus");
const receitas = document.querySelector("#money-plus");
const form = document.querySelector("#form");
const input = document.querySelector("#text");
const inputPreco = document.querySelector("#amount");

const localStorageTransacao = JSON.parse(localStorage.getItem("transacao"));
let modeloTransacao = localStorage.getItem("transacao") !== null ? localStorageTransacao : [];

const removerTransacao = ID => {
    modeloTransacao = modeloTransacao.filter(transacao => transacao.id !== ID);
    init();
    updateLocalStorage();
};
const addTransasaoDOM = function(transacao) {
    const operador = transacao.preco < 0 ? "-" : "+";
    const CSSClass = transacao.preco < 0 ? "minus" : "plus";

    const precoAbsoluto = Math.abs(transacao.preco);

    const li = document.createElement("li");

    li.classList.add(CSSClass);
    li.innerHTML = `
    ${transacao.nome} 
    <span>${operador} R$ ${precoAbsoluto} </span>
    <button class="delete-btn" onClick = "removerTransacao(${transacao.id})">
    x
    </button >
    `;
    transacaoUL.append(li);
};

const updateValor = function() {
    const transacaoPreco = modeloTransacao.map(transacao => transacao.preco);

    const totalPreco = transacaoPreco.reduce(function(acumulador, transacao) {
        return acumulador + transacao;
    }, 0).toFixed(2);

    const filtro = transacaoPreco.filter(function(valor) { return valor > 0 }).reduce(function(acumulador, valor) {
        return acumulador + valor;
    }, 0).toFixed(2);

    const despesas = Math.abs(transacaoPreco.filter(function(valor) { return valor < 0 }).reduce(function(acumulador, valor) {
        return acumulador + valor;
    }, 0)).toFixed(2);

    salario.textContent = `R$ ${totalPreco}`;
    despesasTotal.textContent = `R$ ${despesas}`;
    receitas.textContent = `R$ ${filtro}`;
};

const init = function() {
    transacaoUL.innerHTML = "";
    modeloTransacao.forEach(addTransasaoDOM);
    updateValor();
};

const updateLocalStorage = function() {
    localStorage.setItem("transacao", JSON.stringify(modeloTransacao));
};

const gerarID = () => Math.round(Math.random() * 1000);

const addTransacao = function(transacaoNome, transacaoPreco) {
    modeloTransacao.push({
        id: gerarID(),
        nome: transacaoNome,
        preco: Number(transacaoPreco)
    });
};

const limparInput = function() {
    input.value = "";
    inputPreco.value = "";
};

const submitForm = function(evento) {
    evento.preventDefault();
    const transacaoNome = input.value.trim();
    const transacaoPreco = inputPreco.value.trim();
    const somaTransacao = transacaoNome === "" || transacaoPreco === "";

    if (somaTransacao) {
        alert("Por favor, preencha todos os campos");
        return;
    };

    addTransacao(transacaoNome, transacaoPreco);
    init();
    updateLocalStorage();
    limparInput();
};

init();
form.addEventListener("submit", submitForm);