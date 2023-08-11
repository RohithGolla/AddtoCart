document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
  
        // Check if the item is already in the cart
        const existingItem = Array.from(cartItems.children).find(item => {
          return item.getAttribute('data-name') === productName;
        });
  
        if (existingItem) {
          const countElement = existingItem.querySelector('.item-count');
          const itemCount = parseInt(countElement.textContent) + 1;
          countElement.textContent = itemCount;
        } else {
          const cartItem = document.createElement('li');
          cartItem.setAttribute('data-name', productName);
          cartItem.innerHTML = `
            <span>${productName}</span>
            <span class="item-count">1</span>
            <span>$${price}</span>
            <button class="remove-from-cart">Remove</button>
          `;
  
          cartItems.appendChild(cartItem);
        }
  
        // Update total price
        const currentTotal = parseFloat(totalPrice.textContent);
        totalPrice.textContent = (currentTotal + price).toFixed(2);
      });
    });
  
    cartItems.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-from-cart')) {
        const cartItem = event.target.parentElement;
        const itemName = cartItem.getAttribute('data-name');
        const itemPrice = parseFloat(cartItem.querySelector('span:nth-child(3)').textContent.slice(1));
        const itemCount = parseInt(cartItem.querySelector('.item-count').textContent);
  
        if (itemCount > 1) {
          cartItem.querySelector('.item-count').textContent = itemCount - 1;
        } else {
          cartItem.remove();
        }
  
        // Update total price
        const currentTotal = parseFloat(totalPrice.textContent);
        totalPrice.textContent = (currentTotal - itemPrice).toFixed(2);
      }
    });
  });
  