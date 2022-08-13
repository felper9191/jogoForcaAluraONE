let jogoInicio = document.querySelector(".jogoInicio");
let adicionaPalavra = document.querySelector(".adicionaPalavra");
let apareceForca = document.getElementById("apareceForca");

let botaoNovoJogo = document.getElementById("botaoNovoJogo");
let botaoAdicionarPalavras = document.getElementById("botaoAdicionarPalavras");

let botaoSalvar = document.getElementById("botaoSalvar");
let botaoCancelar = document.getElementById("botaoCancelar");
let campoPalavraNova = document.getElementById("campoPalavraNova");

let botao2NovoJogo = document.getElementById("botao2NovoJogo");
let botaoSair = document.getElementById("botaoSair");

let mensagem = "A palavra foi salva!\nO jogo irá começar...";

let tela = document.getElementById("tela");
let pincel = tela.getContext("2d");
let tamanho = 50;
let espaco = 15;
let acrescimo = tamanho + espaco;
let corTracos = "blue";

let palavras = ["cruzeiro", "santos", "flamengo", "sport", "londrina"];
let sorteiaPalavra = Math.floor(Math.random() * palavras.length);
let palavraSorteada = palavras[sorteiaPalavra];
let numLetras = palavraSorteada.length;

let pontoX = (1200 - (tamanho * numLetras) - (espaco * (numLetras - 1)))/2;
let pontoY = 600;

let letras = [];

let acertos = 0;
let erros = 0;
let jaFoi = [];
let count = 0;

let corForca = "black";

let mensagemFinal = document.getElementById("mensagemFinal");
mensagemFinal.style.display = "none";
    
function criaTracos(){
    for(let i = 0; i < numLetras; i++){
      pincel.beginPath();
      pincel.moveTo(pontoX + (i * acrescimo), pontoY);
      pincel.lineTo(pontoX + tamanho + (i * acrescimo), pontoY);               
      pincel.strokeStyle = corTracos;
      pincel.stroke();

      letras.push(palavraSorteada[i]);
      console.log(letras);

    
       document.addEventListener('keypress', pegaLetra);
    
    }
}
    
    function pegaLetra(e){
        if(acertos === letras.length || erros === 9){
           return;
        }else{
            console.log(e.key);

            pincel.font = "2.5rem calibri";
            pincel.fillStyle = "red";
            pincel.fillText(e.key.toUpperCase(), 1100, 300 + (count * 30));

            count++;
            if(jaFoi.includes(e.key)){
                alert("A letra " + e.key + " já foi digitada!");
            }else{
            for(let j = 0; j < numLetras; j++){
                if(e.key === letras[j]){
                  pincel.font = "3.5rem calibri";
                  pincel.fillStyle = "blue";
                  pincel.fillText(e.key.toUpperCase(), pontoX + (j * acrescimo), pontoY - 2);
                  console.log("Acertou");
                  acertos++;
                }    
            }      

            if(acertos == letras.length){
                console.log(acertos);
                mensagemFinal.style.display = "flex";
                mensagemFinal.style.color = "#44ff44";
                mensagemFinal.textContent = "Parabéns!!!\nVocê Ganhou!";
            }
        }

            if(!(letras.includes(e.key)) || jaFoi.includes(e.key)){
                console.log("Errou");
                erros++;
                console.log(erros);
                criaForca(erros);
                if(erros == 9){
                  mensagemFinal.style.display = "flex";
                  mensagemFinal.style.color = "#ff4444";
                  mensagemFinal.textContent = "Não foi desta vez.\nVocê perdeu!";
                }

            }  

        jaFoi.push(e.key);
        }
    }

    function crialinhasForca(xInicial, yInicial, xFinal, yFinal, corForca, espessura){
        pincel.beginPath();
        pincel.moveTo(xInicial, yInicial);
        pincel.lineTo(xFinal, yFinal);
        pincel.strokeStyle = corForca;
        pincel.lineWidth = espessura;
        pincel.stroke();
    }

    function criaCirculoForca(xInicial, yInicial, raio, inicioAngulo, fimAngulo, sentido, corForca){
        pincel.beginPath();
        pincel.arc(xInicial, yInicial, raio, inicioAngulo, fimAngulo, sentido);
        pincel.strokeStyle = corForca;
        pincel.stroke();
    }

    function criaForca(erros){
        if(erros == 1){
            crialinhasForca(400, 420, 400, 140, corForca, 3);
        }

        if(erros == 2){
            crialinhasForca(400, 140, 530, 140, corForca, 3);
        }

        if(erros == 3){
            crialinhasForca(530, 140, 530, 205, corForca, 3);
        }

        if(erros == 4){
            criaCirculoForca(530, 225, 20, 0, 2 * Math.PI, true, corForca);
        }

        if(erros == 5){
            crialinhasForca(530, 245, 530, 320, corForca, 3);
        }

        if(erros == 6){
            crialinhasForca(530, 260, 465, 315, corForca, 3);
        }

        if(erros == 7){
            crialinhasForca(530, 260, 595, 315, corForca, 3);
        }

        if(erros == 8){
            crialinhasForca(530, 320, 465, 390, corForca, 3);
        }

        if(erros == 9){
            crialinhasForca(530, 320, 595, 390, corForca, 3);
        }

    }

    function novoJogo(){
        jogoInicio.style.display = "none";
        adicionaPalavra.style.display = "none";
        apareceForca.style.display = "flex";
        criaTracos();
    }
    
    function AdicionarPalavras(){
        jogoInicio.style.display = "none";
        adicionaPalavra.style.display = "flex";
        apareceForca.style.display = "none";
    }

    function salvaEComeca(){
        alert(mensagem);
        jogoInicio.style.display = "none";
        adicionaPalavra.style.display = "none";
        apareceForca.style.display = "flex";
        criaTracos();
    }
    
    function cancelar(){
        campoPalavraNova.value = "";
        jogoInicio.style.display = "flex";
        adicionaPalavra.style.display = "none";
        apareceForca.style.display = "none";
    }
    
    function novoJogoESair(){
        location.reload(true);
    }
    
botaoNovoJogo.addEventListener('click', novoJogo);
botaoAdicionarPalavras.addEventListener('click', AdicionarPalavras);
botaoSalvar.addEventListener('click', salvaEComeca);
botaoCancelar.addEventListener('click', cancelar);
botao2NovoJogo.addEventListener('click', novoJogoESair);
botaoSair.addEventListener('click', novoJogoESair);