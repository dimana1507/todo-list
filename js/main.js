console.log('test');




$(document).ready(function () {


    showTask();


    $(function () {
        $("#sortable").sortable();
        $("#sortable").disableSelection();
    });

  

});


//JS




//отметить готовoе
var check = document.getElementsByClassName('lb_p-column');


for (let i = 0; i < check.length; i++) {
    check[i].addEventListener('click', checkNoteActive);
}


function checkNoteActive() {
    this.style.background = '#c0c0c0';
    this.style.textDecoration = 'line-through';
    this.removeEventListener('click', checkNoteActive);
    this.addEventListener('click', checkNoteDis);
}

function checkNoteDis() {
    this.style.background = '#fff';
    this.style.textDecoration = 'none';
    this.removeEventListener('click', checkNoteDis);
    this.addEventListener('click', checkNoteActive);
}




//удалить

var delete_btn = document.getElementsByClassName('delete');
if (delete_btn.length == 0) {
    document.getElementById('list_block').style.display = 'none';
    document.getElementById('hidden_txt').style.display = 'block';
}


for (let i = 0; i < delete_btn.length; i++) {
    delete_btn[i].addEventListener('click', deleteNote);
}


function deleteNote() { 
    // удаление с локалстореджа
    localStorage.removeItem(this.parentElement.getAttribute('data-itemid'));
    // удаление с списка
    this.parentElement.remove();
    // Проверка есть ли цели
    if (delete_btn.length == 0) {
        document.getElementById('list_block').style.display = 'none';
        document.getElementById('hidden_txt').style.display = 'block';
    }
}
function checkListCountToDelete(){
    // обновление счетчика количества блокав что бы можно было удалить добавленые блоки
   delete_btn = document.getElementsByClassName('delete');
   
    for (let i = 0; i < delete_btn.length; i++) {
        delete_btn[i].addEventListener('click', deleteNote);
   }
}




// добавить 
var add_btn = document.getElementById('add_button');
add_btn.addEventListener('click', addToList);

var tdMask = 'tdl_';

window.onkeypress = pressed;
function pressed(e) 
{
	key = e.keyCode || e.which;
	if(key == 13)
        addToList();
}


function addToList() {

    let digit = document.getElementById('input_info').value;
    if (digit == 0) {
        alert("Ввведите текст!")
    }

    else {
        // Проверка наличие блока для пунктов
        if (document.getElementById('list_block').style.display == 'none') {
            document.getElementById('list_block').style.display = 'block';
            document.getElementById('hidden_txt').style.display = 'none';
        }
        addToLocalStorage();
        


        let parent = document.getElementById('sortable');
        let div = document.createElement('div');
        let btn = document.createElement('button');
        btn.classList.add('delete');

        let p = document.createElement('p');
        p.classList.add('txt');
        p.innerHTML = digit;


        div.classList.add('lb_p-column');
        div.appendChild(p);
        div.appendChild(btn);
        div.setAttribute('data-itemid', mask + nId);

        parent.appendChild(div);
        document.getElementById('input_info').value = ' ';

        checkListCountToMark();
        checkListCountToDelete();

    }
}

var nId = 0;
var mask = 'tdl_'


function showTask(){
    var lsLen = localStorage.length;

    if(lsLen > 0) {
        for(let i = 0; i < lsLen; i++){
            var key = localStorage.key(i);
            if(key.indexOf(tdMask) == 0){
                document.getElementById('list_block').style.display = 'block';
                document.getElementById('hidden_txt').style.display = 'none';
                let parent = document.getElementById('sortable');
                
                        let div = document.createElement('div');
                        
                        let btn = document.createElement('button');
                        btn.classList.add('delete');
                
                        let p = document.createElement('p');
                        p.classList.add('txt');
                        p.innerHTML = localStorage.getItem(key);
                
                        div.classList.add('lb_p-column');
                        div.appendChild(p);
                        div.appendChild(btn);
                        div.setAttribute('data-itemid', key);
                
                        parent.appendChild(div);
                       
                        checkListCountToMark();
                        checkListCountToDelete();
                                              
            }
        }
    }
}


function checkListCountToMark(){
    // обновление счетчика количества блокав что бы можно было отметить добавленые блоки
    check = document.getElementsByClassName('lb_p-column');
    for (let i = 0; i < check.length; i++) {
        check[i].addEventListener('click', checkNoteActive);
    }
}



// добавление в localStorage
function addToLocalStorage(){
        var timeVal = document.getElementById('input_info').value;
        var lsLen = localStorage;
        for(let i = 0; i < lsLen.length; i++){
            
           var jellid = lsLen.key(i).slice(4);
           if(jellid > nId){
               nId = jellid;
           }
        }
        
        
        nId++;

        localStorage.setItem(mask + nId, timeVal);
    }

function removeFromLocalStorage(){
    // текст елемента списка сравнить с LS.value и удалять
}































