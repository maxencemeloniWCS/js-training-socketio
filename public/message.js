const socket = io();
const messageInput = document.querySelector('#message');
const messageForm = document.querySelector('#form');
const messages = document.querySelector('#messages');
function writeMessage(message, type = 'message') {
    let p = document.createElement('p');
    if (type === 'broadcast') {
        p.innerText = message;
    } else {
        p.innerText = `user: ${message.username} - message: ${message.message}`;
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
       writeMessage({username: 'me', message}, 'me');
       messageInput.value = '';
       messageInput.focus();
   }
});

socket.on('message', writeMessage);

socket.on('broadcast', broadcast => {
    writeMessage(broadcast, 'broadcast');
});

