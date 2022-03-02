const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// classes names
const UNCHECK = 'fa-circle';
const CHECK = 'fa-check-circle';
const LINE_THROUGH = 'lineThrough';

// variables
let LIST, id;
// get items from localstorage

//show todays date
const options = { weekday: 'long', month: 'short', day: 'numeric' };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// add to do function
function addTodo(toDo, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';

    const item = `<li>
                    <i class="far ${DONE} co" job='complete' id="${id}"></i>
                    <p class='text ${LINE}' >${toDo}</p>
                    <i class="fas fa-trash-alt de" job='delete' id="${id}"></i>
                    </li>
                    `;
    list.insertAdjacentHTML('beforeend', item);
}

// add an item to the list user the enter key
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addTodo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            })

            input.value = '';

            //add items to localstorage
            localStorage.setItem('TODO', JSON.stringify(LIST));

            id++;
        }
        console.log(LIST);
    }
});

// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target the items created dynamicall
list.addEventListener('click', function (event) {
    console.log(list, 'list');
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == 'complete') {
        completeToDo(element);
    } else if (elementJob == 'delete') {
        removeToDo(element);
    }
    //add items to localstorage
    localStorage.setItem('TODO', JSON.stringify(LIST));
})

addTodo('list items', 1, false, true);