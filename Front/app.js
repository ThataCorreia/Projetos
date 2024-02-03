const enviarQ = document.querySelector("form");
let iPergunta;
let iResposta;

enviarQ.addEventListener('focusin', function () {
    document.body.classList.add('blur-background');
});

enviarQ.addEventListener('focusout', function () {
    document.body.classList.remove('blur-background');
});

function limparCampo(tag){
    campo = document.querySelector(tag);
    campo.value = "";
    }

function cadastraQuestoes(){
    iPergunta = document.querySelector(".pergunta").value;
    iResposta = document.querySelector(".resposta").value;
    if(iPergunta == ""){

        alert("Pergunta não pode ser vazia ");

    }else if(iResposta == ""){
        
        alert("Resposta não pode ser vazia ");

    }else{
    alert(`Pergunta: ${iPergunta} // Resposta: ${iResposta}  foi enviada e salva no banco de dados.`)
    fetch("http://localhost:8080/bancoquestao/salvar",
    {
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST", 
        body: JSON.stringify({
            pergunta: iPergunta,
            resposta: iResposta
        }) 
    })
    .then(function (res){console.log(res)})
    .catch(function (res){console.log(res)})
}
}

function obterQuestoes(){
    const pergunta = document.querySelector(".pergunta").value
    const params = new URLSearchParams({
    pergunta // precisa ser mesmo nome que o requistado na api
    })
    alert(params)
    if(iPergunta == ""){
        alert("Pergunta não pode ser vazia ");
    }else{
    fetch(`http://localhost:8080/bancoquestao/obterquestao?${params}`,
    {
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET", 
    })
    .then(response => response.json())
    .then(Questao=>{
        console.log(Questao);
    })
}
}
function obterQ(){
    obterQuestoes();
}
enviarQ.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastraQuestoes();
    limparCampo(".pergunta");
    limparCampo(".resposta");
});
