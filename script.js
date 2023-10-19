let inp = document.querySelector("input")
let add = document.querySelector("button")
let delAll = document.getElementById("del-all")
let con = document.querySelector("ul")
let rmv = document.getElementById("remove")
let storage = localStorage

const deleteFunction = (button)=>{
  button.addEventListener("click",()=>{
    con.removeChild(button.parentElement.parentElement)
    if(con.innerHTML === ""){
      delAll.style.display = "none"
      rmv.style.display = "none"
    }
    storage.setItem("tasks",con.innerHTML)
  })
}

const updateFunction = (button)=>{
  button.addEventListener("click",()=>{
    let papa = button.parentElement.parentElement.querySelector("p")
    let msk = button.parentElement.parentElement.querySelector(".mini-input")

    msk.addEventListener("keypress",(e)=>{
      if(e.code === "Enter"){
        button.click()
      }
    })

    if(papa.style.display !== "none"){
      papa.style.display = "none";
      msk.value = ""
      msk.style.display = "inline-block";
      msk.focus()
      return
  }

  if(msk.style.display !== "none"){
    if (msk.value != "") {
      papa.innerText = msk.value;
    }
      papa.style.display = "inline-block";
      msk.style.display = "none";
      storage.setItem("tasks",con.innerHTML)
      return
  }
  })
}

window.addEventListener("load",()=>{
  if(storage.getItem("tasks") === null){
    tutorial = [
      "Hello there",
      "Write a new task in the textbox above",
      "Press <span>Add</span> to input the task",
      "Press <span>Update</span> to edit a task",
      "Press <span>Delete</span> to remove a task",
      "Press <span>Delete All</span>  to clear the to-do list",
      "Press <span>Remove Data</span> to clear your local storage"
    ]

    tutorial.forEach((e)=>{
      add.disabled = false
      inp.value = e
      add.click()
    })
    return
  }
  con.innerHTML = storage.getItem("tasks")
  let del = document.querySelectorAll(".del")
  let up = document.querySelectorAll(".up")
  
  if(con.innerHTML != ""){
    delAll.style.display = "inline-block"
    rmv.style.display = "inline-block"
  }

  del.forEach((button)=>{deleteFunction(button)})

  up.forEach((button)=>{updateFunction(button)})
})

rmv.addEventListener("click",()=>{
  if(confirm("Click OK to clear your local storage")){
    storage.clear()
    window.location.reload()
  }
})

delAll.addEventListener("click",()=>{
  con.innerHTML = ""
  storage.setItem("tasks",con.innerHTML)
  delAll.style.display = "none"
  rmv.style.display = "none"
})

// focus on input
inp.focus()

// if input is empty then the 'add' button is disabled
inp.addEventListener('keyup',(e)=>{
  if(inp.value.length != 0 && inp.value.match(/\w|[!@#\$%\^\&*\)\(+=.-]/)){
    add.disabled = false
    return
  }

  add.disabled = true
})

// pressing enter triggers 'add' button
inp.addEventListener("keypress",(e)=>{
  if(e.code === "Enter"){
    add.click()
  }
})

const input_task = ()=>{
  // if input value is empty, it will not create a new task
  if(document.querySelector("input").value === ""){
    return
  }
  
  // disable add button right after creating a new task
  add.disabled = true
  delAll.style.display = "inline-block"
  rmv.style.display = "inline-block"

  // make container height flexible
  let he = document.getElementById("isi");
  he.style.height = "fit-content";

  // select the <ul> element from the html file
  let con = document.querySelector("ul");

  // create new list element
  let task = document.createElement("li");
  task.className = "task"

  // create new paragraph element where it stores the value from the input
  let papa = document.createElement("p");
  papa.className = "task-text"
  papa.innerHTML = document.querySelector("input").value;

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
  updateFunction(but1)

  // create new delete button for each task
  let but2 = document.createElement("button");
  but2.className = "del";
  but2.textContent = "Delete";
  deleteFunction(but2)

  // the <ul> element will append an empty <li> element
  con.appendChild(task);
  document.querySelector("input").value = "";

  //that <li> element will contain the task, the invisible update input box, and the two buttons
  task.appendChild(papa);
  task.append(msk);
  butt.appendChild(but1);
  butt.appendChild(but2);
  task.appendChild(butt);

  inp.focus()
  storage.setItem("tasks",con.innerHTML)
}
console.log(storage.getItem("tasks"))
