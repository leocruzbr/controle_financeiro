const transacaoUL = document.querySelector("transactions");

const modeloTransacao = [
    { id: 1, nome: 'Bolo', preco: -21 },
    { id: 2, nome: 'Salario', preco: 3000 },
    { id: 1, nome: 'Torta', preco: -10 },
    { id: 1, nome: 'Violão', preco: 150 }
];
const addTransasaoDOM = transacao => {
    const operador = transacao.preco < 0 ? "-" : "+";
    const CSSClass = transacao.preco < 0 ? "minus" : "plus";
    const li = document.createElement("li");
    const precoAbsoluto = Math.abs(transacao.preco);
    li.classList.add(CSSClass);
    li.innerHTML = `
    ${transacao.nome} <span>${operador} R$ ${precoAbsoluto} </span><button class="delete-btn">x</button >
    `;
    transacaoUL.append(li);
};
const init = () => {
    modeloTransacao.forEach(addTransasaoDOM)
}
init();