console.log("Welcome to Notes App...");

const addBtn = document.querySelector('#ad-btn');
const cont = document.querySelector('#cont');

// Creating card Container(div)
let cardContainer = document.createElement('div');
cardContainer.classList.add('row', 'container-fluid');

// creating card
let card = document.createElement('div');
card.classList.add('card', 'my-2', 'mx-2', 'noteCard');
card.style.width = "18rem";

// creating card Body
let cardBody = document.createElement('div');
cardBody.classList.add('card-body');


// Creating card Title
let cardTitle = document.createElement('h5');
cardTitle.classList.add('card-title');
cardTitle.innerText = 'Notes';

// Creating Card text
let cardText = document.createElement('p');
cardTitle.classList.add('card-text');

// Creating card Button
let cardBtn = document.createElement('button');
cardBtn.classList.add('btn', 'btn-primary');
cardBtn.innerText = 'Delete';

//apending child in card body
cardBody.appendChild(cardTitle);
cardBody.appendChild(cardText);
cardBody.appendChild(cardBtn);

// apending child in card 
card.appendChild(cardBody);

// apending child in card container
cardContainer.appendChild(card);

showNotes();

addBtn.addEventListener('click', () => {
    let inputText = document.querySelector('.inpText');
    let inputTitle = document.querySelector('.inpTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push({ 'title': inputTitle.value, 'text': inputText.value });

    localStorage.setItem('notes', JSON.stringify(notesObj));
    inputTitle.value = '';
    inputText.value = '';
    // console.log(notesObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        if (element.title == '') {
            html += `<div class="card my-2 mx-2 noteCard" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" style="text-decoration: underline;">No Title</h5>
            <p class="card-text">${element.text}</p>
            <button id=" ${index}" onclick="deleteNote(this.id)" class="btn btn-primary" >Delete</button>
        </div>
    </div>`
        }
        else {
            html += `<div class="card my-2 mx-2 noteCard" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id=" ${index}" onclick="deleteNote(this.id)" class="btn btn-primary" >Delete</button>
        </div>
    </div>`
        }
    });
    let notesElm = document.querySelector('#notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else if (notesObj.length == 0) {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add note`
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
    // console.log("I am deleting",index);
}

let search = document.querySelector('#searchTxt');
search.addEventListener('input', () => {
    let inputVal = search.value;
    // console.log('input event fired..',inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    let searchOption = document.querySelector('.searchOption');

    if (searchOption.value == 'text') {
        Array.from(noteCards).forEach(function (element) {
            let cardTxt = element.getElementsByTagName('p')[0].innerText;
            // console.log(cardTxt);
            if (cardTxt.includes(inputVal)) {
                element.style.display = 'block';
            }
            else {
                element.style.display = 'none';
            }
        })
    }
    else {
        Array.from(noteCards).forEach(function (element) {
            let cardTitle = element.getElementsByTagName('h5')[0].innerText;
            // console.log(cardTxt);
            if (cardTitle.includes(inputVal)) {
                element.style.display = 'block';
            }
            else {
                element.style.display = 'none';
            }
        })
    }
})

let searchOption = document.querySelector('.searchOption');
searchOption.addEventListener('click',()=>{
    search.value='';
})
