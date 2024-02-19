let listaDeNumerosSorteados = [];
let numeroLimite = 100
let numSecreto = gerarNumeroAleatorio()
let tentativas = 1 

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.3});
}

function exibirMensagemInicial() {
    exibirTextoNaTela ('h1', 'Jogo do número secreto');
    exibirTextoNaTela ('p', `Escolha um número entre 1 e ${numeroLimite}`);
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numSecreto) {
    exibirTextoNaTela ('h1', 'Acertou!'); 
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
    exibirTextoNaTela ('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
            exibirTextoNaTela ('h1' , 'Você errou!')
            if (numSecreto > chute) {
            exibirTextoNaTela ('p', `Tente novamente, o número secreto é maior que ${chute}`);
            } else if (numSecreto < chute) {
            exibirTextoNaTela ('p', `Tente novamente, o número secreto é menor que ${chute}`);    
            }
        tentativas++;
        limparCampo()
        }    
    }

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1); //uso do return para aramzenar o número aleatório retornado na variavel numSecreto, devo usar quando a funçao devolver alguma informação
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //adiciona item ao final da lista
        return numeroEscolhido;
    }
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
