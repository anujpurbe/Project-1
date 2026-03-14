function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartBadge(){
  let cart = getCart();
  let total = cart.reduce((sum,item)=>sum+item.qty,0);

  let badge = document.getElementById("cartCount");
  if(badge) badge.textContent = total;

  updateFloatingCart();
}

function addItem(id,name,price,img){
  let cart = getCart();
  let item = cart.find(i=>i.id===id);

  if(item){
    item.qty++;
  }else{
   cart.push({id,name,price,qty:1,img});
  }

saveCart(cart);
updateMenuButtons();
updateCartBadge();

showToast(name + " added to cart");
}

function increaseQty(id){
  let cart = getCart();
  let item = cart.find(i=>i.id===id);

  if(item) item.qty++;

  saveCart(cart);
  updateMenuButtons();
  updateCartBadge();
}

function decreaseQty(id){
  let cart = getCart();
  let item = cart.find(i=>i.id===id);

  if(!item) return;

  item.qty--;

  if(item.qty<=0){
    cart = cart.filter(i=>i.id!==id);
  }

  saveCart(cart);
  updateMenuButtons();
  updateCartBadge();
}
function showToast(message){
let toast = document.getElementById("toast");

if(!toast) return;

toast.textContent = "✔ " + message;
toast.classList.add("show");

setTimeout(()=>{
toast.classList.remove("show");
},2000);
}

function updateMenuButtons(){
  let cart = getCart();

  document.querySelectorAll(".menu-item").forEach(card=>{
    let id = parseInt(card.dataset.id);
    let btn = card.querySelector(".cart-btn");

    let item = cart.find(i=>i.id===id);

    if(item){
      btn.innerHTML = `
        <button onclick="decreaseQty(${id})">-</button>
        <span>${item.qty}</span>
        <button onclick="increaseQty(${id})">+</button>
      `;
    }else{
      let name = card.dataset.name;
      let price = card.dataset.price;
      let img = card.dataset.img;
      btn.innerHTML = `
        <button onclick="addItem(${id},'${name}',${price},'${img}')">ADD</button>
      `;
    }
  });
}

function updateFloatingCart(){
  let cart = getCart();

  let bar = document.getElementById("floatingCart");

  if(!bar) return;

  if(cart.length===0){
    bar.classList.remove("show");
    return;
  }

  let items = cart.reduce((sum,i)=>sum+i.qty,0);
  let total = cart.reduce((sum,i)=>sum+i.qty*i.price,0);

  bar.classList.add("show");

  document.getElementById("floatingItems").textContent = items+" ITEMS";
  document.getElementById("floatingTotal").textContent = "₹"+total;
}

document.addEventListener("DOMContentLoaded",()=>{
  updateMenuButtons();
  updateCartBadge();
});

/* Search Function */

function searchFood(){

let input=document.getElementById("searchInput").value.toLowerCase();
let items=document.querySelectorAll(".menu-item");

items.forEach(function(item){

let name=item.dataset.name.toLowerCase();

if(name.includes(input)){
item.style.display="block";
}else{
item.style.display="none";
}

});

}

/* Category Filter */

function filterFood(category){

let items=document.querySelectorAll(".menu-item");

items.forEach(function(item){

if(category==="all" || item.dataset.category===category){
item.style.display="block";
}else{
item.style.display="none";
}

});

}

function validateForm(){

let name=document.getElementById("name").value.trim()
let email=document.getElementById("email").value.trim()
let message=document.getElementById("message").value.trim()

let emailPattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/

let valid=true

// Name validation
if(name.length<3){
document.getElementById("nameError").innerText="Name must be at least 3 characters"
valid=false
}else{
document.getElementById("nameError").innerText=""
}

// Email validation
if(!email.match(emailPattern)){
document.getElementById("emailError").innerText="Enter a valid email"
valid=false
}else{
document.getElementById("emailError").innerText=""
}

// Message validation
if(message.length<10){
document.getElementById("messageError").innerText="Message must be at least 10 characters"
valid=false
}else{
document.getElementById("messageError").innerText=""
}

if(valid){
alert("Message sent successfully!")
}

return valid

}