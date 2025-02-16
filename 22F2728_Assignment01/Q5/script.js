// Example product list
const products = [
    { id: 1, name: 'Laptop', price: 100000 },
    { id: 2, name: 'Smartphone', price: 50000 },
    { id: 3, name: 'Headphones', price: 5000 },
    { id: 4, name: 'Smartwatch', price: 20000 }
  ];
  
  // Render product list with checkboxes
  const productListEl = document.getElementById('productList');
  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `<label>
      <input type="checkbox" class="product-checkbox" data-price="${product.price}">
      ${product.name} - ${product.price} PKR
    </label>`;
    productListEl.appendChild(li);
  });
  
  // Function to extract the discount percentage from the roll number.
  // If a hyphen exists, we extract from the part after it (e.g., "21F-9445" yields "44").
  // Otherwise, we remove non-digits and pick the middle two digits.
  const getDiscountFromRoll = roll => {
    if (!roll) return 0;
    let discountStr = "";
    if (roll.includes('-')) {
      const parts = roll.split('-');
      if (parts[1]) {
        // Remove non-digits from the second part
        const secondPart = parts[1].replace(/\D/g, '');
        if (secondPart.length >= 2) {
          const mid = Math.floor((secondPart.length - 2) / 2);
          discountStr = secondPart.substring(mid, mid + 2);
        } else {
          discountStr = secondPart;
        }
      }
    } else {
      const digits = roll.replace(/\D/g, '');
      if (digits.length >= 2) {
        const mid = Math.floor((digits.length - 2) / 2);
        discountStr = digits.substring(mid, mid + 2);
      } else {
        discountStr = digits;
      }
    }
    let discount = parseInt(discountStr, 10);
    if (isNaN(discount)) discount = 0;
    return discount;
  };
  
  // Function to update discount and final price in real time.
  const updatePrices = () => {
    const roll = document.getElementById('rollNumber').value.trim();
    const promo = document.getElementById('promoCode').value.trim();
    
    // Base discount from roll number
    let baseDiscount = getDiscountFromRoll(roll);
    
    // Default maximum discount is 50%
    let maxDiscount = 50;
    
    // Extra discount from promo code (bonus): if promo code is "EXTRA10", add 10%
    const extraDiscount = promo === 'EXTRA10' ? 10 : 0;
    
    // Total discount before enforcing maximum
    let totalDiscount = baseDiscount + extraDiscount;
    
    // Get all selected products (using Array and arrow functions)
    const checkboxes = Array.from(document.querySelectorAll('.product-checkbox'));
    const selectedCheckboxes = checkboxes.filter(cb => cb.checked);
    
    // BONUS: Increase max discount to 60% if two or more products are selected
    if (selectedCheckboxes.length >= 2) {
      maxDiscount = 60;
    }
    
    // Ensure that the discount does not exceed the maximum allowed
    totalDiscount = Math.min(totalDiscount, maxDiscount);
    
    // Update discount percentage in the DOM
    document.getElementById('discountPercent').textContent = totalDiscount;
    
    // Calculate final price from selected products using reduce()
    const totalPrice = selectedCheckboxes
      .map(cb => parseFloat(cb.getAttribute('data-price')))
      .reduce((sum, price) => sum + price, 0);
    
    const finalPrice = totalPrice * (1 - totalDiscount / 100);
    
    // Update final price display (rounded to 2 decimals)
    document.getElementById('finalPrice').textContent = finalPrice.toFixed(2);
  };
  
  // Attach event listeners for real-time updates
  document.getElementById('rollNumber').addEventListener('input', updatePrices);
  document.getElementById('promoCode').addEventListener('input', updatePrices);
  document.querySelectorAll('.product-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updatePrices);
  });
  