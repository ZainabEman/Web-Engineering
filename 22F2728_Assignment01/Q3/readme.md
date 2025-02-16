# Selective String Reversal with Dynamic List Population

## Overview

This interactive web-based tool processes a user-input string by reversing its characters while  **skipping every N-th character** —where **N** is dynamically determined by summing the digits of the provided roll number. The transformed result, along with the original string, is displayed in a dynamically updated list on the webpage. An optional feature allows users to manually specify the skip interval, offering additional flexibility.

---

## Features

* **Dynamic Input Form:**
  * Accepts a string to transform.
  * Accepts a roll number to compute the skip interval.
  * **Bonus:** Optionally input a custom skip interval.
* **Skip Interval Calculation:**
  * Computes the skip interval by summing the digits of the roll number.
  * Handles edge cases, such as when the skip interval is greater than the string length.
* **Selective String Reversal:**
  * Reverses the string while preserving every N-th character in its original position.
  * Maintains spacing and formatting.
* **Dynamic Results Display:**
  * Displays both the original and transformed strings in a list.
  * Updates the DOM instantly without page reloads.
* **Modern JavaScript Techniques:**
  * Utilizes arrow functions, `map()`, `reduce()`, and `Set` for clean and efficient code.

---

## File Structure

* **index.html:**
  Contains the HTML structure and form elements for user input.
* **style.css:**
  Provides the styling for the webpage, ensuring a clean and responsive UI.
* **script.js:**
  Implements the logic for calculating the skip interval, performing the selective string reversal, and updating the DOM with results.

---

## How It Works

1. **User Input:**
   * The user enters a string and a roll number (e.g., `3738`).
   * Optionally, the user can also enter a custom skip interval.
2. **Skip Interval Determination:**
   * The script extracts the digits from the roll number and computes their sum to determine  **N** .
   * If a manual skip interval is provided, it is used instead.
3. **Selective Reversal Process:**
   * The tool converts the input string into an array of characters.
   * It creates a set of indices (based on 1-indexing) that should remain unchanged (every N-th character).
   * Characters not in the skip set are reversed, while the skipped characters remain in their original positions.
4. **Display Results:**
   * The original and transformed strings are displayed as a new item in the result list via DOM manipulation.

---

## Installation & Usage

1. **Clone or Download the Repository:**
   * Ensure all three files (`index.html`, `style.css`, and `script.js`) are in the same directory.
2. **Open the Application:**
   * Open `index.html` in your web browser.
3. **Use the Tool:**
   * Enter the string you wish to transform.
   * Input your roll number (e.g., `3738`).
   * (Optional) Enter a custom skip interval.
   * Click the **"Transform"** button to see the results.

---

## Technologies Used

* **HTML** for structuring the webpage.
* **CSS** for styling and responsive design.
* **Vanilla JavaScript (ES6+)** for logic and DOM manipulation:
  * **Arrow Functions**
  * **Array Methods:** `map()`, `reduce()`
  * **Set**
  * **DOM Manipulation**
