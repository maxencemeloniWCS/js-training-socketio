const socket = io();

document.querySelector('#form').addEventListener('submit', e => {
    e.preventDefault();
    console.log('Add Count');
    socket.emit('addCount', 1);
})

socket.on('newCount', count => {
    console.log('New count : ',count);
    document.querySelector('h1 span').innerText = count;
});






