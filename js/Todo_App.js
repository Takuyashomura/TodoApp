(()=>{
//現在時刻表示
const pElement = document.createElement('p');
    pElement.classList.add('now-time');
const timeElement = document.getElementById('time');

nowTime();
function nowTime() {
    let now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();

//数字が１桁の場合左に0を表示
    if(hour < 10) hour = '0' + hour;
    if(min < 10) min = '0' + min;
    if(sec < 10) sec = '0' + sec;

    pElement.textContent = (hour + ':' + min + ':' + sec);   
    timeElement.appendChild(pElement);
};
setInterval(function(){nowTime()},1000);
///////////////////////////////////////////////////
///////////////////////////////////////////////////

//タスク一覧表示のための配列
let todos = [];
let todos2 = localStorage.getItem('my-todos');
todos = JSON.parse(todos2);

const input = document.getElementById('input-todo');
const button = document.getElementById('input-button');
const container = document.getElementById('todo-container');

const set_message = document.getElementById('set-message');
button.addEventListener('click', (event)=>{
    const todo = input.value;
    input.value = '';
    if(todo){
        if(todo === '　'){
            const message = '文字を入力してください。';
            const messageElement = document.createElement('p');
            messageElement.classList.add('message');
            messageElement.textContent = message;
            set_message.appendChild(messageElement);
        }
        todos.push(todo);
        ShowTodos();
        localStorage.setItem('my-todos', JSON.stringify(todos));
    }
});

//タスク一覧表示
const ShowTodos = ()=>{
while(container.firstChild){
    container.removeChild(container.firstChild);
}
    todos.forEach((todo, index) =>{
        const Item = document.createElement('li');
        const ItemNum = index + 1;

        Item.textContent = `${ItemNum}: ${todo}`;
        container.appendChild(Item);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = '削除';
        Item.appendChild(deleteButton);

        deleteButton.addEventListener('click', (event) => {
            deleteTask(index);
        });
    });
}

//タスク削除処理
const deleteTask = (index)=>{
    todos.splice(index, 1);
    ShowTodos();
    localStorage.setItem('my-todos', JSON.stringify(todos));
}
if(todos.length > 0){
    ShowTodos();
}
}) ();
