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
