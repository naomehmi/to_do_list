let inp = document.querySelector("input")
let add = document.querySelector("button")
inp.focus()

inp.addEventListener('keydown',(e)=>{
  if(inp.value.length >= 0){
    add.disabled = false
  } else{
    add.disabled = true
  }
  if(e.code){
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
  if(document.querySelector("input").value === ""){
    return
  }
  
  add.disabled = true

  let he = document.getElementById("isi");
  he.style.height = "fit-content";

  let con = document.querySelector("ul");

  let task = document.createElement("li");

  let papa = document.createElement("p");
  papa.className = "task-text"
  papa.innerText = document.querySelector("input").value;

  let msk = document.createElement("input");
  msk.setAttribute("type", "text");
  msk.className = "mini-input";
  msk.style.display = "none";

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

  con.appendChild(task);
  document.querySelector("input").value = "";

  task.appendChild(papa);
  task.append(msk);
  butt.appendChild(but1);
  butt.appendChild(but2);
  task.appendChild(butt);

  but3.style.display="inline-block"

  // delete 1 task
  but2.addEventListener("click", () => {
    con.removeChild(task);
    if(con.childElementCount === 0){
      but3.style.display = "none"
    }
  });
  
  // edit/update a task
  but1.addEventListener("click", () => {
    if(papa.style.display !== "none"){
        papa.style.display = "none";
        msk.value = ""
        msk.style.display = "inline-block";
        msk.focus()
    } else{
      if (msk.value != "") {
        papa.innerText = msk.value;
      }
        papa.style.display = "inline-block";
        msk.style.display = "none";
    }
  });

  // delete all tasks
  but3.addEventListener("click", () =>{
    con.innerHTML = ""
    but3.style.display="none"
    inp.focus()
  })

  inp.focus()
}
