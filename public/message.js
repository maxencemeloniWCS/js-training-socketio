const socket = io();
const messageInput = document.querySelector('#message');
const messageForm = document.querySelector('#form');
const messages = document.querySelector('#messages');
const usersList = document.querySelector('#users');
function writeMessage(message, type = 'message') {
    let p = document.createElement('p');
    if (type === 'message') {
        p.innerHTML = `<span class="user">${message.username} : </span><span>${message.message}</span>`;
    } else {
        p.innerText = message;
    }
    p.classList.add(type);
    messages.appendChild(p);
    messages.scrollTop = messages.scrollHeight;
}

messageForm.addEventListener('submit', e => {
   e.preventDefault();
   const message = messageInput.value;
   if (message !== '') {
       socket.emit('message', message);
       writeMessage(message, 'me');
       messageInput.value = '';
       messageInput.focus();
   }
});

socket.on('message', writeMessage);

socket.on('broadcast', broadcast => writeMessage(broadcast, 'broadcast'));

socket.on('users', users => {
    usersList.innerHTML = '';
    for(let i in users) {
        let li = document.createElement('li');
        li.innerText = users[i];
        usersList.appendChild(li);
    }
});

