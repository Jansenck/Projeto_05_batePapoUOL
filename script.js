let userName;

function includeUser(){

    userName = prompt("Digite o seu nome de usuário: ");
    const objectName = {name: userName};

    const promisseRefresh = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objectName);

    promisseRefresh.then(refreshConection);

    promisseRefresh.catch(function () {

        alert("Este nome de usuário já existe. Por favor, digite um nome de usuário válido.");

        includeUser()
    });

}

includeUser();

setTimeout(getMessages, 3000);

function refreshConection(refreshUser){

    const objectName = {name: userName};

    let promisseRefresh = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objectName);

    promisseRefresh.then(getMessages);

    setInterval(refreshConectionLoop, 5000);

}

function refreshConectionLoop(){

    const objectNameLoop = {name: userName};

    let promisseRefreshLoop = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objectNameLoop);

}

function getMessages(messages){
    
    const promisseMessages = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");  

    promisseMessages.then(filterNewMessages);
   
}

let updatedMessages = [];

function filterNewMessages(messages){

    let oldMessages = messages.data;

    for(let i = 0; i < oldMessages.length; i++){

        if(!updatedMessages.includes(oldMessages[i])){

            updatedMessages.push(oldMessages[i]);
        }
    }
 
    includeMessages(updatedMessages);
    
}

function includeMessages(messages){

    let includeDataMessages = document.querySelector(".chat");

    for(let i = 0; i < messages.length; i++){
        
        if(messages[i].type == "message"){

            includeDataMessages.innerHTML += `
    
            <div class="message">
                <p><span class="message-time">${ messages[i].time}</span> <b>${ messages[i].from}</b> para <b>${ messages[i].to}</b>: ${ messages[i].text}</p>
            </div>
            
            `;
            
        } else if(messages[i].type == "status"){
            
            
            includeDataMessages.innerHTML += `
            
            <div class="message status">
            <p><span class="message-time">${ messages[i].time}</span> <b>${ messages[i].from}</b> ${ messages[i].text}</p>
            </div>
            
            `;
            
        }
        if (messages[i].type == "private_message"){
            
            if (messages[i].to == `${userName}`){
            
            
                includeDataMessages.innerHTML += `
                
                <div class="message private-message">
                <p><span class="message-time">${ messages[i].time}</span> <b>${ messages[i].from}</b> reservadamente para <b>${ messages[i].from}</b>: ${ messages[i].text}</p>
                </div>
                
                `;
    
            }

        }
        
    }
    
    scrollMessages();
}

function scrollMessages(){
    const chat = document.querySelector(".chat");
    chat.scrollIntoView(false);
    
}

function sendMessage(){

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

    getMessages();
}
