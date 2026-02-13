/* ======================
   CART STORAGE
====================== */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ======================
   CART BADGE (ALL PAGES)
====================== */

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});

function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;

  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = totalQty;
}

/* ======================
   MINI CART (OPTIONAL)
====================== */

function renderMiniCart() {
  const box = document.getElementById("miniCartItems");
  const totalEl = document.getElementById("miniCartTotal");
  if (!box || !totalEl) return;

  const cart = getCart();
  let total = 0;
  box.innerHTML = "";

  if (cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty</p>";
    totalEl.textContent = "Total: ₹0";
    return;
  }

  cart.forEach(item => {
    total += item.price * item.qty;
    box.innerHTML += `<p>${item.name} × ${item.qty}</p>`;
  });

  totalEl.textContent = "Total: ₹" + total;
}

