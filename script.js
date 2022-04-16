let userName;

function includeUser(){

    userName = prompt("Digite o seu nome de usuário: ");
    const objectName = {name: userName};

    const promisseRefresh = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objectName);

    promisseRefresh.then(refreshConection);

    promisseRefresh.catch(function (response) {
        console.log(response.data[0].status);
    });

}
includeUser();

function refreshConection(refreshUser){
    console.log(refreshUser.status);
    const objectName = {name: userName};

    let promisseRefresh = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objectName);

    promisseRefresh.then(setInterval(function (participants){
    
    
        const promisseParticipants = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
        promisseParticipants.then(getMessages);
        
        
    }, 5000));
    
}


setInterval(function processParticipants(participants){
    
    
    const promisseParticipants = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promisseParticipants.then(processParticipants);
    
    
}, 5000);

function getMessages(messages){

    const promisseMessages = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    
    promisseMessages.then(includeMessages);

    
}
getMessages();

function includeMessages(messages){

    console.log(messages.data.length)

    let includeDataMessages = document.querySelector(".chat");

    for(let i = 0; i < messages.data.length; i++){
        
        includeDataMessages.innerHTML += `
        
        <div class="message">
            <p>${messages.data[i].time} ${ messages.data[i].from} para ${messages.data[i].to}: ${ messages.data[i].text}</p>
        </div>
        
        `;
    }

}
