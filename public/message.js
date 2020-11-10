const socket = io();

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages-list');
let form = document.querySelector('#user-form');
let userInput = document.querySelector('#user-form input#username');
let usersList = document.querySelector('ul#users-list');
let screenConnected = document.querySelector('#screen-connected');
let memorize = document.querySelector('#memorize');

let username = getCookie('username');
if (username !== null) {
    userInput.value = username;
    memorize.checked = true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!memorize.checked) {
        eraseCookie('username');
    } else {
        setCookie('username', userInput.value, 999);
    }

    socket.emit('user', userInput.value);
    userInput.value = '';
    screenConnected.classList.remove('hidden');
    form.classList.add('hidden');
});

messageInput.focus();
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let message = messageInput.value;
    socket.emit('message', message)
    writeMessage('me', {message});
    messageInput.value = '';
    messageInput.focus();
    messagesList.scrollTop = messagesList.scrollHeight;
});

socket.on('message', data => {
    writeMessage('message', data);
});

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
        let deco = type === 'login' ? '' : 'dé';
        p.innerText = `${content} vient juste de se ${deco}connecter !`;
        messagesList.appendChild(p);
    }
})

function writeMessage(type, data) {
    if (type === 'message') {
        let p = document.createElement('p');
        p.classList.add('username');
        p.innerText = data.user + ':';
        messagesList.appendChild(p);
    }
    let p = document.createElement('p');
    p.classList.add(type);
    p.innerText = data.message;
    messagesList.appendChild(p);
}

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
