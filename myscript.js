const List = document.getElementById("List");
const Input = document.getElementById("Input");
let Current = null;

function AddElement(){
    if (Input.value === '') {
        alert("Input box cannot be empty")
    }else{
        var li = document.createElement("li");
        li.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center text-break';
        li.innerHTML = 
        `
        <button onclick="done()" class="btn btn-outline-warning done-btn"><i class="fa-solid fa-check"></i></button>
        <span contenteditable>${Input.value}</span>
        <button onclick="remove()" class="btn btn-outline-dark delete-btn"><i class="fa-regular fa-trash-can"></i></button>
        `;
        List.appendChild(li);
        Input.value = '';
        SaveLocal();
    }
}

let currentlyEditing = null;

List.addEventListener('click', ClickHandler);

function ClickHandler(e){
    if(e.target.classList.contains('delete-btn')){
        e.target.parentElement.remove();
       
    } else if (e.target.classList.contains('done-btn')){
        e.target.parentElement.classList.toggle("text-decoration-line-through");
        e.target.parentElement.classList.toggle("list-group-item-success");
      
    } 
    SaveLocal();
}


function SaveLocal(){
    localStorage.setItem("data",List.innerHTML);
}

function LoadData(){
    List.innerHTML = localStorage.getItem("data");
}

LoadData();
