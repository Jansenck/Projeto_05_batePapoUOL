let userName;

function includeUser(){

    userName = prompt("Digite o seu nome de usuário: ");
    const objectName = {name: userName};

    const promisseRefresh = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objectName);

    promisseRefresh.then(refreshConection);

    promisseRefresh.catch(function (error) {

        alert("Este nome de usuário já existe. Por favor, digite um nome de usuário válido.");

        includeUser()
    });

}
includeUser();

function refreshConection(refreshUser){

    const objectName = {name: userName};

    let promisseRefresh = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objectName);

    promisseRefresh.then(resetMessages);

    setInterval(refreshConectionLoop, 5000);

}

function refreshConectionLoop(){
    const objectName = {name: userName};

    let promisseRefresh = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objectName);
}

function resetMessages(request){

    let includeDataMessages = document.querySelector(".chat");
    includeDataMessages.innerHTML = "";

    getMessages();
}

function getMessages(messages){
    
    const promisseMessages = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");  
    promisseMessages.then(includeMessages);
   
}


function includeMessages(messages){

    let includeDataMessages = document.querySelector(".chat");

    for(let i = 0; i < messages.data.length; i++){
        
        if(messages.data[i].type == "message"){

            includeDataMessages.innerHTML += `
    
            <div class="message">
                <p>${messages.data[i].time} ${ messages.data[i].from} para ${messages.data[i].to}: ${ messages.data[i].text}</p>
            </div>
            
            `;
            
        } else if(messages.data[i].type == "status"){
            
            
            includeDataMessages.innerHTML += `
            
            <div class="message status">
            <p>${messages.data[i].time} ${ messages.data[i].from} ${ messages.data[i].text}</p>
            </div>
            
            `;
            
        } else if (messages.data[i].type == "private_message"){
            
            
            includeDataMessages.innerHTML += `
            
            <div class="message private-message">
            <p>${messages.data[i].time} ${ messages.data[i].from} reservadamente para ${messages.data[i].to}: ${ messages.data[i].text}</p>
            </div>
            
            `;

        }
        
    }
    
    scrollMessages();
}

function scrollMessages(){
    const chat = document.querySelector(".chat");
    chat.scrollIntoView(false);
    
    setTimeout(resetMessages, 3000);
}

function sendMessage(){

    console.log("ENTREI EM SEND");
    let messageInput = document.querySelector("input").value;

    const objectMessage = {
        from: `${userName}`,
        to: "Todos",
        text: `${messageInput}`,
        type: `${"message"}`
    };

    const promisseSendMessage = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objectMessage);

    promisseSendMessage.then(function sendUserMessages(messages){
    
        const promisseMessages = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");  
       
    });
    
    promisseSendMessage.catch(function (response){
        alert("Erro ao enviar a messagem. Por favor, reinicie a página!")
    });

}
