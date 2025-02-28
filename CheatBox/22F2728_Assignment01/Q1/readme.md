# Our Bags Collection

## Overview

This project is a dynamic, interactive web-based product display for a bags collection. It features a sidebar that lists various handbags and a main container where detailed product information is displayed. Users can click on a product from the sidebar to view its details, including an image, name, price, and description. Additionally, the interface supports a dark mode toggle, allowing users to switch between light and dark themes seamlessly.

---

## Features

* **Dynamic Product List:**
  * The sidebar dynamically lists available handbags.
  * Clicking on a product name loads its details into the main display area.
* **Product Detail View:**
  * Detailed product information includes an image, product name, price, and description.
  * Each product card features a front and back side effect, providing an engaging user experience.
* **Dark Mode Toggle:**
  * A built-in switch allows users to toggle dark mode on or off.
  * Dark mode adjusts the color scheme of the sidebar and product container for improved readability in low-light environments.
* **Responsive and Modern UI:**
  * Clean layout with responsive design to ensure a great user experience on various devices.
  * Smooth transitions and hover effects enhance the interactivity of the product cards.

---

## File Structure

* **index.html:**
  * Contains the HTML structure including the sidebar for the product list, the main container for product details, and the dark mode toggle switch.
* **style.css:**
  * Provides styling for the layout, including the sidebar, product cards, and dark mode styles.
  * Includes responsive design and smooth transition effects for interactive elements.
* **script.js:**
  * Defines an array of product objects with details such as name, price, image path, and description.
  * Dynamically populates the product list in the sidebar and handles the display of detailed product information in the main container.
  * Implements the dark mode toggle functionality to switch between light and dark themes.

---

## Installation & Usage

1. **Download or Clone the Repository:**
   * Ensure that the `index.html`, `style.css`, and `script.js` files are located in the same directory.
2. **Open the Application:**
   * Open the `index.html` file in any modern web browser to view the product collection.
3. **Interact with the Interface:**
   * **Browse Products:** Click on any product name in the sidebar to view its detailed information.
   * **Dark Mode:** Use the toggle switch located at the top right of the page to switch between light and dark mode.
   * **Buy Now:** Although the "Buy Now" button is currently linked to a console log action, it can be extended to include further functionality such as adding the product to a cart.

---

## Technologies Used

* **HTML5:**
  Structures the application and its interactive components.
* **CSS3:**
  Provides styling, layout, and responsive design, including dark mode transitions.
* **Vanilla JavaScript (ES6+):**
  * Dynamically populates product data.
  * Handles user interactions such as product selection and dark mode toggling.
  * Implements interactive elements and smooth transitions without the need for external libraries.

---

## Customization

* **Product Data:**
  Update the `products` array in `script.js` to add, remove, or modify products. Ensure that the image paths are correctly specified.
* **Dark Mode Colors:**
  Modify the dark mode color settings in `style.css` to suit your design preferences.
* **Buy Now Button:**
  Extend the functionality of the "Buy Now" button in `script.js` to integrate with an e-commerce backend or shopping cart system.
