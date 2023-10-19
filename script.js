let inp = document.querySelector("input")
let add = document.querySelector("button")

// focus on input
inp.focus()

// pressing enter triggers 'add' button
inp.addEventListener('keydown',(e)=>{
  if(inp.value.length >= 0){
    add.disabled = false
  } else{
    add.disabled = true
  }
  if(e.code == "Backspace"){
    if(inp.value.length <= 1){
      add.disabled = true
    }
  }
  if(e.code == "Enter"){
    add.click()
    add.disabled = true
  }
})

function input_task() {
  // if input value is empty, it will not create a new task
  if(document.querySelector("input").value === ""){
    return
  }
  
  // disable add button right after creating a new task
  add.disabled = true

  // make container height flexible
  let he = document.getElementById("isi");
  he.style.height = "fit-content";

  // select the <ul> element from the html file
  let con = document.querySelector("ul");

  // create new list element
  let task = document.createElement("li");

  // create new paragraph element where it stores the value from the input
  let papa = document.createElement("p");
  papa.className = "task-text"
  papa.innerText = document.querySelector("input").value;

  // create a new input if the user wants to update a task, the display is set to none so it's invisible
  let msk = document.createElement("input");
  msk.setAttribute("type", "text");
  msk.className = "mini-input";
  msk.style.display = "none";

  // new div to contain the update and delete button
  let butt = document.createElement("div");

  // create new update button for each task
  let but1 = document.createElement("button");
  but1.className = "up";
  but1.textContent = "Update";

  // create new delete button for each task
  let but2 = document.createElement("button");
  but2.className = "del";
  but2.textContent = "Delete";

  // select delete all button
  let but3 = document.getElementById("del-all")

  // the <ul> element will append an empty <li> element
  con.appendChild(task);
  document.querySelector("input").value = "";

  //that <li> element will contain the task, the invisible update input box, and the two buttons
  task.appendChild(papa);
  task.append(msk);
  butt.appendChild(but1);
  butt.appendChild(but2);
  task.appendChild(butt);

  //make the delete all button visible after inputting a task
  but3.style.display="inline-block"

  // delete 1 task
  but2.addEventListener("click", () => {
    con.removeChild(task);
    // if there are no more tasks, the delete all button will be invisible
    if(con.childElementCount === 0){
      but3.style.display = "none"
    }
  });

  // for the update input box, if the user presses enter it automatically triggers the update button
  msk.addEventListener('keypress', (e)=>{
    if(e.code === "Enter"){
      but1.click()
    }
  })
  
  // update a task
  but1.addEventListener("click", () => {
    // if the paragraph element's display is not none, then the update input box will be visible for the user to edit their task
    if(papa.style.display !== "none"){
        papa.style.display = "none";
        msk.value = ""
        msk.style.display = "inline-block";
        msk.focus()
        return
    }
    
    // if the update input box's value isn't empty, then the task's text will not be changed
    if(msk.style.display !== "none"){
      if (msk.value != "") {
        papa.innerText = msk.value;
      }
        papa.style.display = "inline-block";
        msk.style.display = "none";
        return
    }
  });

  // delete all tasks
  but3.addEventListener("click", () =>{
    // empty the <ul> element and make the delete all button invisible
    con.innerHTML = ""
    but3.style.display="none"
    inp.focus()
  })

  inp.focus()
}
