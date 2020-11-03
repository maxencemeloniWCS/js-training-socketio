const login = document.querySelector('#login');
const chat = document.querySelector('#chat');
const loginForm = document.querySelector('#login-form');
const userName = document.querySelector('#username');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = userName.value;
    if (username !== '') {
        socket.emit('username', username);
        login.style.display = 'none';
        chat.style.display = 'block';
    }
});
