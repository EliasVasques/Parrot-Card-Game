
let qtdCartas;
const qtdMaxCartas = 14;

const todasCartas = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

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

const porNumeroCartas = () => {
    const cartas = document.querySelectorAll('.card');
    
   
    for(let i=0; i < qtdMaxCartas - qtdCartas; i++) {
        cartas[i].classList.add('nao-aparece');
    }
}
perguntarQtdCartas();
porNumeroCartas();