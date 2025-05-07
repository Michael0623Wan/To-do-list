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
        `<button onclick="done()" class="btn btn-outline-warning done-btn"><i class="fa-solid fa-check"></i></button>
        <span>${Input.value}</span>
        <button onclick="remove()" class="btn btn-outline-dark delete-btn"><i class="fa-regular fa-trash-can"></i></button>`;
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
        SaveLocal();
    } else if (e.target.classList.contains('done-btn')){
        e.target.parentElement.classList.toggle("text-decoration-line-through");
        e.target.parentElement.classList.toggle("list-group-item-success");
        SaveLocal();
    } else {
        const Item = e.target.closest('.list-group-item');
        if(!Item || Current) return;

        Current = Item;
        const Text = Item.querySelector("span");
        const OriginText = Text.textContent;

        const InputElement = document.createElement('input');
        InputElement.type = 'text';
        InputElement.className = 'form-control';
        InputElement.maxLength = '30';
        InputElement.value = OriginText;

        // Replace the text with the input field
        Text.innerHTML = '';
        Text.appendChild(InputElement);
        InputElement.focus();

        // Handle saving changes
        InputElement.addEventListener('blur', function() {
            const NewText = InputElement.value;
            Text.innerHTML = NewText;
            Current = null;
            SaveLocal();
        });
        
    }
}

function SaveLocal(){
    localStorage.setItem("data",List.innerHTML);
}

function LoadData(){
    List.innerHTML = localStorage.getItem("data");
}

LoadData();
