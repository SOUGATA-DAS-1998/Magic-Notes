console.log("Welcome to note app.this is app.js ");
showNotes();
//if user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById('addTitle');
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let imp =document.getElementById("addMark");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  //Object literals
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
    imp: imp.checked ? "on" : "off",
  }
  notesObj.push(myObj);
  //Updating the data
  localStorage.setItem("notes", JSON.stringify(notesObj));
  
  //Resetting the input fields

  addTitle.value="";
  addTxt.value = "";
  imp.checked=false;
  // console.log(notesObj);

  showNotes();
});

//function To show elements from localstorage
function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
       // For important notes 
       if (element.imp == "on") {
        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 18rem">
        <div class="card-body">
          <i class="fa-solid fa-star" style="color:rgb(235, 177, 52)",></i>
          <h4 class="card-title">${element.title}</h4>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>
        `;
      }
    });
  
    // For normal notes 
    notesObj.forEach(function (element, index) {
      if (element.imp == "off") {
        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 18rem">
        <div class="card-body">
          <h4 class="card-title">${element.title}</h4>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>
        `;
      }
    });


  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a note Section to ad notes`;
  }
}

//Function to delete a note
function deleteNote(index) {
  // console.log("I am Deleting", index);
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index,1); //to remove notes
  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){

  let inputVal = search.value;
  // console.log('Input Event fired!',inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function(element){
    let cardTxt = element.getElementsByTagName("p")[0].innerText; //innerText is used to make the element as string
    //console.log(cardTxt);
    if(cardTxt.includes(inputVal)){
      element.style.display ="block";
    }else{
      element.style.display = "none";
    }
  })
})


/* 
Further Features
1.Add Title
2.Mark a note as Important
3. Separate Notes by User
4.Sync and host to web server
*/