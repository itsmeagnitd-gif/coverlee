let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price){
  const item = cart.find(i => i.id === id);
  if(item){
    item.qty++;
  } else {
    cart.push({id,name,price,qty:1});
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart`);
}

function displayCart(){
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('total-amount');
  if(!container) return;
  container.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} (x${item.qty})</span>
      <span>₹${item.price * item.qty}</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    container.appendChild(div);
  });
  totalEl.textContent = total;
}

function removeFromCart(id){
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

document.addEventListener('DOMContentLoaded', displayCart);
