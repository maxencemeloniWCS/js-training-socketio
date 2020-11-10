const socket = io();

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages-list');
let form = document.querySelector('#user-form');
let userInput = document.querySelector('#user-form input#username');
let usersList = document.querySelector('ul');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('user', userInput.value);
    userInput.value = '';
    usersList.classList.remove('hidden');
    form.classList.add('hidden');
})

socket.on('info', data => {
    if (data.type === 'users-list') {
        usersList.innerText = '';
        data.content.forEach(elem => {
            let li = document.createElement('li');
            li.innerText = elem;
            usersList.appendChild(li);
        });
    }
})
