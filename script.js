
let qtdCartas;
const qtdMaxCartas = 14;

const todasCartas = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

let cartasEmJogo;

const perguntarQtdCartas = () => {
    let numeroEscolhido;
    while (true) {
        numeroEscolhido = prompt("Quantas cartas? (só pares entre 4 e 14)");
        if (numeroEscolhido % 2 !== 0 || numeroEscolhido < 4 || numeroEscolhido > 14) {
            alert("Número par entre 4 e 14, por favor!")
        } else {
            break
        }
    }
    qtdCartas = numeroEscolhido;
}

const porCartasVirada = () => {
    const divCartas = document.querySelector('.cartas');
    for (let i = 0; i < qtdCartas; i++) {
        divCartas.innerHTML +=
            `<div 
        class="carta"
        onclick="virarCarta(this, ${i})">
        <img src="img/papagaio.png" alt="">
    </div>`
    }
}

const cartasEmJogoEmbaralhadas = () => {
    let qtdPares = qtdCartas / 2;

    /* 1 de cada */
    let cartasEscolhidas = todasCartas.slice(0, qtdPares);

    /* 2 de cada*/
    cartasEmJogo = cartasEscolhidas.concat(cartasEscolhidas);

    /* embaralhar */
    cartasEmJogo.sort(comparador)
}

const virarCarta = (carta, posicaoCarta) => {
    let img = carta.querySelector('img');
    img.src = `gifs/${cartasEmJogo[posicaoCarta]}`;
    carta.classList.add('clicada')

    // ver se é a primeira ou segunda carta
    let cartasAbertas = document.querySelectorAll('.clicada');

    // se for a primeira manter 

    // se for a segunda verificar se são iguais
    if (cartasAbertas.length === 2) {
        if (cartasAbertas[0].querySelector('img').src !==
            cartasAbertas[1].querySelector('img').src) {
                setTimeout(() => desvirarCarta(cartasAbertas[0]), 1000)
                setTimeout(() => desvirarCarta(cartasAbertas[1]), 1000)
        }
        cartasAbertas[0].classList.remove('clicada')
        cartasAbertas[1].classList.remove('clicada')
    }

    // se forem iguais manter

    // se forem diferentes virar de volta
}

const desvirarCarta = (carta) => {
    carta.querySelector('img').src = "img/papagaio.png"
}

function comparador() {
    return Math.random() - 0.5;
}

perguntarQtdCartas();
cartasEmJogoEmbaralhadas();
porCartasVirada();
