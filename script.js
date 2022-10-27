let username;
const APIaddress = "https://mock-api.bootcamp.respondeai.com.br/api/v6/uol";
let destino = 'Todos';
let messageType = 'message';

function entrarNaSala(){
    username = prompt("Qual é a sua graça?");
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
    let htmlDasMensagens = document.querySelector(".chat-container");
    htmlDasMensagens.innerHTML = '';

    for(let i = 0; i < response.data.length; i++){
        console.log(response.data[i]);
        const message = response.data[i];    
  
        if(message.type === 'private_message' && (message.from === username || message.to === username)){
            htmlDasMensagens.innerHTML += `
            <li class = "private-message">
                <span class = "hora">${message.time}</span>
                <strong> ${message.from} </strong>
                <span> para <span>
                <strong> ${message.to}: </strong>
                <span> ${message.text} </span>
            </li>
            `
        }

        if(message.type === 'status'){
            htmlDasMensagens.innerHTML += `
            <li class = "status-message">
                <span class = "hora">${message.time}</span>
                <strong> ${message.from} </strong>
                <span> para <span>
                <strong> ${message.to}: </strong>
                <span> ${message.text} </span>
            </li>
            `
        }

        if(message.type === 'message'){
            htmlDasMensagens.innerHTML += `
            <li class = "public-message">
                <span class = "hora">${message.time}</span>
                <strong> ${message.from} </strong>
                <span> para <span>
                <strong> ${message.to}: </strong>
                <span> ${message.text} </span>
            </li>
            `
        }
    }

    //const lastMessage = response.data[response.data.length - 1].time;

}

function enviarMensagem(){
    const message = document.querySelector('message-input').value;
    axios.post(`${APIaddress}/messages`, {from: username, to: des});
}

entrarNaSala();