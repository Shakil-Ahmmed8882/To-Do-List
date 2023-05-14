const container = document.getElementById("container");
const input = document.getElementById("input");
const add = document.getElementById("add");
const itemList = document.getElementById("ul");
//maximum length of input field
input.maxLength = 35;
input.focus();
// Load saved data on page load
window.addEventListener("load", () => {
  showTask();
});

add.addEventListener("click", () => {
  if (input.value.trim() === "") {
    alert("Please enter a task");
    return;
  }
  const item = document.createElement("li");
  item.innerHTML = input.value;
  //creating span button
  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&#10060";
  item.appendChild(closeBtn);
  item.style.cssText = "display:flex; justify-content:space-between;";
  itemList.appendChild(item);
  input.value = "";

  saveData();
  input.focus();
});

// add event listener to itemList element for "click" event
itemList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    if (e.target.classList.contains("checked")) {
      e.target.classList.remove("checked", "btn-color", "fade-in");
    } else {
      e.target.classList.add("checked", "btn-color");
    }
    saveData();
    //remove li when click to the close button
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    input.focus();
    saveData();
  }
});

// add event listener to input field for "keypress" event
input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    // trigger the same code that is executed when the "add" button is clicked
    add.click();
  }
});

//setitme to store data
function saveData() {
  try {
    localStorage.setItem("data", itemList.innerHTML);
  } catch (e) {
    console.log("Error saving data to local storage:", e);
  }
}
//get get the stred data even if you closed the window
function showTask() {
  try {
    itemList.innerHTML = localStorage.getItem("data");
  } catch (e) {
    console.log("Error loading data from local storage:", e);
  }
}
