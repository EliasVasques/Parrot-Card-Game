
let qtdCartas;
let qtdTentativas = 0;
const todasCartas = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];
let cartasEmJogo;

let timer = 0;
let emJogo = false;

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
    qtdCartas = Number(numeroEscolhido);
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
    if(!emJogo) emJogo = true;

    let cartasAbertas = document.querySelectorAll('.tentando');

    if (cartasAbertas.length === 0 || cartasAbertas.length === 1) {
        let img = carta.querySelector('img');
        img.src = `gifs/${cartasEmJogo[posicaoCarta]}`;
        carta.classList.add('tentando')
    }

    /* lendo cartasAbertas novamente */
    cartasAbertas = document.querySelectorAll('.tentando');

    if (cartasAbertas.length === 2) {
        if (cartasAbertas[0].querySelector('img').src !== cartasAbertas[1].querySelector('img').src) {
            setTimeout(() => desvirarCarta(cartasAbertas[0]), 1000)
            setTimeout(() => desvirarCarta(cartasAbertas[1]), 1000)
        } else {
            cartasAbertas[0].classList.add('acertou')
            cartasAbertas[0].classList.remove('tentando')
            cartasAbertas[1].classList.add('acertou')
            cartasAbertas[1].classList.remove('tentando')
        }
        qtdTentativas++;
    }

    terminouJogo();

}

const terminouJogo = () => {
    const cartasViradas = document.querySelectorAll('.acertou');

    if (cartasViradas.length === qtdCartas) {
        emJogo = false;
        alert(`Você ganhou em ${qtdTentativas} jogadas!`)

        let querJogar = prompt("Quer jogar novamente? (sim/não)")
        while (querJogar !== 'sim' && querJogar !== 'não') {
            querJogar = prompt("Quer jogar novamente? (sim/não)")

        }
        if (querJogar === "sim") {
            iniciar()
        }
    }
}

const desvirarCarta = (carta) => {
    carta.querySelector('img').src = "img/papagaio.png"
    carta.classList.remove('tentando')
}

const comparador = () => {
    return Math.random() - 0.5;
}

const iniciar = () => {
    document.querySelector('.cartas').innerHTML = '';

    timer = 0;
    document.querySelector('.timer').innerHTML = '0:0'

    qtdTentativas = 0
    
    perguntarQtdCartas();
    cartasEmJogoEmbaralhadas();
    porCartasVirada();
}

const atualizarTimer = () => {
    if(!emJogo) return;
    timer++;
    let minutos = Math.floor(timer / 60);
    let segundos = Math.floor(timer % 60);
    document.querySelector('.timer').innerHTML = `${minutos}:${segundos}`;
}

setInterval(atualizarTimer, 1000);

iniciar();

