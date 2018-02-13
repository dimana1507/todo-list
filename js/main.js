
var add_btn = document.getElementById('add_button');//кнопка добавления нового таска
var check = document.getElementsByClassName('lb_p-column');//количество таксов
var delete_btn = document.getElementsByClassName('delete');//кнопка удаления таска
var nId = 0;
var tdMask = 'tdl_'//маска для добавления в ls
var add_new_img_btn = document.getElementsByClassName('new__img--btn');//кнопка для добавления картинки

showTask();

//отметить готовoе
for (var i = 0; i < add_new_img_btn.length; i++) {
    add_new_img_btn[i].addEventListener('click', blockCheck);
    add_new_img_btn[i].addEventListener('change', downloadNewImg);
}

function blockCheck() {
    console.log(this.parentElement);
    this.parentElement.removeEventListener('click', checkNoteActive);
}
for (var i = 0; i < check.length; i++) {
    check[i].addEventListener('click', checkNoteActive);
}
//отмечаем готова ли таска
function checkNoteActive(event) {
    this.classList.toggle('active');
    var key = this.getAttribute('data-itemid');
    var ls_array = JSON.parse(localStorage.getItem(key));
    ls_array.done = !ls_array.done;
    localStorage.setItem(key, JSON.stringify(ls_array));
    event.stopPropagation();
}


// загрузка картинки
function downloadNewImg(event) {

    var input = event.target;
    var _id = this.parentElement.getAttribute('data-itemid');
    var reader = new FileReader();

    var ls_array = JSON.parse(localStorage.getItem(_id));
    reader.onload = function () {
        var dataURL = reader.result;
        var output = document.getElementById(_id);
        output.src = dataURL;
        ls_array.dataUrl = dataURL;
        localStorage.setItem(_id, JSON.stringify(ls_array));

    };
    reader.readAsDataURL(input.files[0]);
      
    this.parentElement.addEventListener('click', checkNoteActive);


}

//удалить
if (delete_btn.length == 0) {
    document.getElementById('list_block').style.display = 'none';
    document.getElementById('hidden_txt').style.display = 'block';
}

for (var i = 0; i < delete_btn.length; i++) {
    delete_btn[i].addEventListener('click', deleteNote);
}

function deleteNote() {
    // удаление с localstorage
    localStorage.removeItem(this.parentElement.getAttribute('data-itemid'));
    // удаление с списка

    $(this).parent().fadeOut(500, () => {
        $(this).parent().remove()
    });

    // Проверка есть ли таски
    if (delete_btn.length === 1) {
        $('#list_block').hide(500);
        $('#hidden_txt').slideDown(500);

    }
}
// обновление количество элементов
function checkListCountToDelete() {
    // обновление счетчика количества блокав что бы можно было удалить добавленые блоки
    delete_btn = document.getElementsByClassName('delete');

    for (var i = 0; i < delete_btn.length; i++) {
        delete_btn[i].addEventListener('click', deleteNote);
    }
}

// добавить 
add_btn.addEventListener('click', addToList);
window.onkeypress = pressed;
function pressed(e) {
    key = e.keyCode || e.which;
    if (key == 13)
        addToList();
}
// добавление тасков с инпута
function addToList() {

    var digit = document.getElementById('task_title').value;
    var description_value = document.getElementById('task_description').value;
    if (digit == 0 || description_value == 0) {
        alert("Ввведите текст!")
    }

    else {
        // Проверка наличие блока для пунктов
        if (document.getElementById('list_block').style.display == 'none') {
            $('#hidden_txt').hide(500);
            $('#list_block').slideDown(700);

        }
        addToLocalStorage();
        var lsLen = localStorage.length;

        if (lsLen > 0) {
            for (var i = 0; i < lsLen; i++) {
                var key = localStorage.key(i);
            }
        }

        var parent = document.getElementById('sortable');
        var div = document.createElement('div');
        var btn = document.createElement('button');
        btn.classList.add('delete');
        var img = document.createElement('img');
        img.classList.add('personal__img');
        img.setAttribute('id', key);
        img.setAttribute('type', 'file');
        img.setAttribute('src', ' ');

        var new_img_btn = document.createElement('input');
        new_img_btn.setAttribute('type', 'file');
        new_img_btn.classList.add('new__img--btn');
        var task_title = document.createElement('p');
        task_title.classList.add('task_title');
        task_title.innerHTML = digit;
        var task_description = document.createElement('p');
        task_description.classList.add('description');
        task_description.innerHTML = description_value;
        div.classList.add('lb_p-column');

        div.appendChild(img);
        div.appendChild(task_title);
        div.appendChild(task_description);
        div.appendChild(btn);
        div.appendChild(new_img_btn);
        div.setAttribute('data-itemid', tdMask + nId);

        parent.appendChild(div);


        document.getElementById('task_title').value = ' ';
        document.getElementById('task_description').value = ' ';
        checkListCountToMark();
        checkListCountToDelete();

    }
}



// выгрузка тасков с localstorage
function showTask() {
    var lsLen = localStorage.length;

    if (lsLen > 0) {
        for (var i = 0; i < lsLen; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(tdMask) == 0) {

                document.getElementById('list_block').style.display = 'block';
                document.getElementById('hidden_txt').style.display = 'none';
                var parent = document.getElementById('sortable');

                var div = document.createElement('div');

                var btn = document.createElement('button');
                btn.classList.add('delete');

                var img = document.createElement('img');
                img.classList.add('personal__img');
                img.setAttribute('id', key);
                img.setAttribute('type', 'file');
                img.setAttribute('src', JSON.parse(localStorage.getItem(key)).dataUrl);

                var new_img_btn = document.createElement('input');
                new_img_btn.setAttribute('type', 'file');
                new_img_btn.classList.add('new__img--btn');

                var task_title = document.createElement('p');
                task_title.classList.add('task_title');
                task_title.innerHTML = JSON.parse(localStorage.getItem(key)).title;

                var task_description = document.createElement('p');
                task_description.classList.add('description');
                task_description.innerHTML = JSON.parse(localStorage.getItem(key)).description;

                div.classList.add('lb_p-column');
                if (JSON.parse(localStorage.getItem(key)).done) {
                    div.classList.add('active');
                }
                div.appendChild(img);
                div.appendChild(task_title);
                div.appendChild(task_description);
                div.appendChild(btn);
                div.appendChild(new_img_btn);

                div.setAttribute('data-itemid', key);

                parent.appendChild(div);

                checkListCountToMark();
                checkListCountToDelete();

            }
        }
    }

}


function checkListCountToMark() {
    var add_new_img_btn = document.getElementsByClassName('new__img--btn');

    //отметить готовoе
    for (var i = 0; i < add_new_img_btn.length; i++) {
        add_new_img_btn[i].addEventListener('click', blockCheck);
        add_new_img_btn[i].addEventListener('change', downloadNewImg);
    }

    // обновление счетчика количества блокав что бы можно было отметить добавленые блоки
    check = document.getElementsByClassName('lb_p-column');
    for (var i = 0; i < check.length; i++) {
        check[i].addEventListener('click', checkNoteActive);
    }
}

// добавление в localStorage
function addToLocalStorage() {
    var timeTitle = document.getElementById('task_title').value;
    var timeDescription = document.getElementById('task_description').value;
    var timeArr = {
        'title': timeTitle,
        'description': timeDescription,
        'done': false,
        'dataUrl' : ' '
    };

    var lsLen = localStorage;
    for (var i = 0; i < lsLen.length; i++) {

        var jellid = lsLen.key(i).slice(4);
        if (jellid > nId && jellid !== nId) {
            nId = jellid;
        }
    }
    nId++;

    localStorage.setItem(tdMask + nId, JSON.stringify(timeArr));
}
