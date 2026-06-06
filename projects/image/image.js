let value = document.querySelector(".h1");
let add = document.querySelector("#add");
let remove = document.querySelector("#remove");

add.addEventListener("click",() => {
value.innerText="Fridens"
value.style.color ="green";
})

remove.addEventListener("click",() => {
value.innerText="Stanger"
value.style.color ="red";
})