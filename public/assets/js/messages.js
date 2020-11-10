const socket = io();
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages-list');

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
