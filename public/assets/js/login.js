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

    messageInput.focus();
});
