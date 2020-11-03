const socket = io();

const messageInput = document.querySelector('#message');
const messageForm = document.querySelector('#form');
const messages = document.querySelector('#messages');

messageForm.addEventListener('submit', e => {
   e.preventDefault();
   const message = messageInput.value;
   if (message !== '') {
       socket.emit('message', message);
       messageInput.value = '';
   }
});

socket.on('message', message => {
    let p = document.createElement('p');
    p.innerText = message;
    messages.appendChild(p);
})
