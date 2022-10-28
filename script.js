let username;
const APIaddress = 'https://mock-api.bootcamp.respondeai.com.br/api/v6/uol';
let destino = 'Todos';
let messageType = 'message';

function entraNaSala(){
    username = prompt('Escolha seu nome de usuário (username)');
    const promise = axios.post(`${APIaddress}/participants`,  { name: username });
    promise.then(puxaMensagens);
    promise.catch(erroAoEntrar);
}

function puxaMensagens(){
    if(username !== undefined){
        const promise = axios.get(`${APIaddress}/messages`);
        //chama a função que carrega as mensagens na tela
        promise.then(renderizaMensagens);
    }
}

function erroAoEntrar(){
    console.log("Erro ao entrar na sala");
    username = undefined;
}

function renderizaMensagens(response){
    console.log(response.status);
    let htmlDasMensagens = document.querySelector('.chat-container');
    htmlDasMensagens.innerHTML = '';
    for(let i = 0; i < response.data.length; i++){
        console.log(response.data[i]);
        const message = response.data[i];    
  
        if(message.type === 'private_message' && (message.from === username || message.to === username)){
            htmlDasMensagens.innerHTML += `
            <li class = 'private-message'>
                <span class = 'hora'>${message.time}</span>
                <strong> ${message.from} </strong>
                <span> para <span>
                <strong> ${message.to}: </strong>
                <span> ${message.text} </span>
            </li>
            `
        }

        if(message.type === 'status'){
            htmlDasMensagens.innerHTML += `
            <li class = 'status-message'>
                <span class = 'hora'>${message.time}</span>
                <strong> ${message.from} </strong>
                <span> para <span>
                <strong> ${message.to}: </strong>
                <span> ${message.text} </span>
            </li>
            `
        }

        if(message.type === 'message'){
            htmlDasMensagens.innerHTML += `
            <li class = 'public-message'>
                <span class = 'hora'>${message.time}</span>
                <strong> ${message.from} </strong>
                <span> para <span>
                <strong> ${message.to}: </strong>
                <span> ${message.text} </span>
            </li>
            `
        }
    }
    scrollIntoLast();
}

function scrollIntoLast(){
    //scrollamos a página até a última mensagem
    const lastMsg = document.querySelector('.chat-container').lastChild;
    lastMsg.scrollIntoView();
}

function enviarMensagem(){
    //seleciona o input
    const messageToSend = document.querySelector('input').value;
    //envia para a api
    const messageDone = axios.post(`${APIaddress}/messages`, {from: username, to: destino, text: messageToSend, type: messageType});
    messageDone.then(enviouMensagem);

}

function enviouMensagem(){
    //limpa o campo de input de mensagem
    document.querySelector('input').value = '';
    //após enviar a mensagem, vamos renderizar as mensagens na tela imediatamente
    puxaMensagens();
}

function mantemLogado(){
    if(username !== undefined){
        axios.post(`${APIaddress}/status`, {name: username});
    }
}

//funcao que mantém gerencia as principais funcionalidades do chat
function gerenciaChat(){
    entraNaSala();

    setInterval(mantemLogado, 5000);
    setInterval(puxaMensagens, 3000);
}

gerenciaChat();