const socket = io();

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages-list');
let form = document.querySelector('#user-form');
let userInput = document.querySelector('#user-form input#username');
let usersList = document.querySelector('ul#users-list');
let screenConnected = document.querySelector('#screen-connected');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('user', userInput.value);
    userInput.value = '';
    screenConnected.classList.remove('hidden');
    form.classList.add('hidden');
})

socket.on('info', ({type, content}) => {
    if (type === 'users-list') {
        usersList.innerText = '';
        content.forEach(elem => {
            let li = document.createElement('li');
            li.innerText = elem;
            usersList.appendChild(li);
        });
    } else if (type === 'login' || type === 'logout') {
        let p = document.createElement('p');
        p.classList.add('user', type);
        let deco = type === 'login' ? '':'dé';
        p.innerText = `${content} vient juste de se ${deco}connecter !`;
        messagesList.appendChild(p);
    }
})
