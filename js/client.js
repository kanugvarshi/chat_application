const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
var sound= new Audio('notification_sound.wav');

const append=(message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position=='left')
    {
        sound.play();
    }
    
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})

const uname = prompt("enter your name to join");
console.log(uname);
socket.emit('new-user-joined',uname);

socket.on('user-joined',data=>{
    append(`${data} joined the chat`, 'right' );
})
socket.on('receive',data=>{
    append(`${data.uname}: ${data.message} `, 'left' );
})
socket.on('left',name=>{
    append(`${name} left the chat`,'right');
})