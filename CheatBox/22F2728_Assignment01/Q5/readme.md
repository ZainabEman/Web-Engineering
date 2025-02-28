# Roll-Number based Discount System

## Overview

This e-commerce discount system dynamically calculates a discount for students based on their roll number. The discount is determined by extracting the middle two digits of the roll number (for example, from "21F-9445", the discount is 44%). The system displays a list of products, allows students to select one or more items, and calculates the final price in real time. Additionally, an optional promo code can provide extra discounts, and selecting multiple products may increase the maximum discount cap.

---

## Features

* **Roll Number-Based Discount Calculation:**
  * Extracts the middle two digits from the roll number (e.g., "21F-9445" → 44%).
  * Caps the base discount at 50% (or increases to 60% if two or more products are selected).
* **Real-Time Price Calculation:**
  * Instantly updates the discount percentage and final price as the student enters their roll number, applies a promo code, or selects products.
* **Product Selection:**
  * Displays a list of products with prices.
  * Students can select multiple products, with the final price computed using the sum of selected product prices and the applied discount.
* **Promo Code Bonus (Bonus):**
  * An additional promo code (e.g., "EXTRA10") can be entered for extra discounts on top of the roll number discount.
* **Modern JavaScript Techniques:**
  * Uses ES6+ features like arrow functions, `map()`, `reduce()`, and dynamic DOM manipulation to provide instant feedback.

---

## File Structure

* **index.html:**
  Contains the HTML structure, including inputs for the roll number, promo code, and a product list with checkboxes. It also displays the calculated discount percentage and final price.
* **style.css:**
  Provides a clean, responsive user interface with styling for form elements, product listings, and output displays.
* **script.js:**
  Implements the logic to:
  * Extract the discount percentage from the roll number.
  * Update the discount and final price dynamically in real time.
  * Handle product selection and promo code inputs.
  * Enforce discount caps and compute the total price using array methods like `map()` and `reduce()`.

---

## How It Works

1. **Input Roll Number and Promo Code:**
   * The student enters their roll number (e.g., "21F-9445") and an optional promo code (e.g., "EXTRA10").
   * The system extracts the middle two digits from the roll number to determine the base discount.
2. **Selecting Products:**
   * A list of products with prices is displayed using checkboxes.
   * Students can select one or more products to purchase.
3. **Discount Calculation:**
   * The base discount is calculated from the roll number.
   * Any valid promo code adds an extra discount.
   * The total discount is capped at 50% (or increased to 60% when two or more products are selected).
   * The final price is computed by applying the discount to the total sum of selected products.
4. **Real-Time Updates:**
   * As the student types their roll number, applies a promo code, or selects/deselects products, the discount percentage and final price update immediately without a page reload.

---

## Installation & Usage

1. **Download or Clone the Repository:**
   Ensure that all three files (`index.html`, `style.css`, and `script.js`) are located in the same directory.
2. **Open the Application:**
   Open the `index.html` file in any modern web browser.
3. **Interact with the System:**
   * Enter your roll number and, optionally, a promo code.
   * Select one or more products from the list.
   * Watch the discount percentage and final price update in real time.

---

## Technologies Used

* **HTML5:**
  Structures the application and its interactive elements.
* **CSS3:**
  Provides responsive and modern styling for an optimal user experience.
* **Vanilla JavaScript (ES6+):**
  * **Arrow Functions:** For concise and modern function expressions.
  * **Array Methods:** Uses `map()` and `reduce()` for efficient data handling.
  * **DOM Manipulation:** Instantly updates the UI based on user interactions.
