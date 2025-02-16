# Bank Account System

## Overview

This interactive bank account simulation allows students to create a unique bank account using their roll number. The system dynamically generates an account number and initializes the account balance based on the student's roll number. It supports deposits, withdrawals, and transaction tracking while enforcing specific financial constraints. All interactions update the interface in real time using vanilla JavaScript, HTML, and CSS.

---

## Features

* **Dynamic Account Creation:**
  * Students create an account by entering their roll number.
  * A unique account number is generated (e.g., `ACC1234` for roll number `1234`).
  * The initial deposit is set as the last digit of the roll number multiplied by 1000 (e.g., for roll number ending with `8`, the initial deposit is  **8000 PKR** ).
* **Transactions:**
  * **Deposits:**
    * Deposit amounts must be a multiple of the student's roll number.
    * Transactions are added to the transaction history dynamically.
  * **Withdrawals:**
    * Withdrawals are limited to a maximum of 80% of the current balance.
    * Withdrawal amounts are recorded as negative values in the transaction history.
* **Transaction History:**
  * All transactions (initial deposit, deposits, and withdrawals) are logged.
  * The current balance is calculated in real time using the `reduce()` method.
  * The history is displayed dynamically using DOM manipulation.
* **Bonus Feature:**
  * Users can download the complete transaction history as a `.txt` file.

---

## File Structure

* **index.html:**
  Contains the HTML structure including forms for account creation and transactions, and sections for displaying account information and transaction history.
* **style.css:**
  Provides styling for a clean and user-friendly interface, ensuring responsiveness and clarity.
* **script.js:**
  Implements the core logic for:
  * Creating the account (generating account number and initializing balance).
  * Handling deposits and withdrawals.
  * Enforcing deposit and withdrawal constraints.
  * Updating the transaction history and current balance in real time.
  * Facilitating the download of the transaction history.

---

## How It Works

1. **Account Creation:**
   * The user enters their roll number in the "Create Your Account" form.
   * A unique account number is generated (e.g., prefixing the roll number with `"ACC"`).
   * The initial deposit is determined by multiplying the last digit of the roll number by 1000 PKR.
   * Once the account is created, the account creation section is hidden and the account information, transaction, and history sections become visible.
2. **Transaction Processing:**
   * **Deposits:**
     * The deposit amount is validated to ensure it is positive and a multiple of the roll number.
     * Upon validation, the deposit is added to the transaction history.
   * **Withdrawals:**
     * The withdrawal amount is validated to ensure it is positive.
     * The system checks that the withdrawal does not exceed 80% of the current balance.
     * If valid, the withdrawal (recorded as a negative value) is added to the transaction history.
3. **Real-Time Updates:**
   * The current balance is recalculated after each transaction using the `reduce()` function.
   * The transaction history list is dynamically updated using DOM manipulation.
   * Any financial constraint violations are communicated to the user through real-time messages.
4. **Downloading Transaction History (Bonus):**
   * A download button allows the user to generate and download a `.txt` file containing all transaction details and the current balance.

---

## Installation & Usage

1. **Clone or Download the Repository:**
   * Ensure all three files (`index.html`, `style.css`, and `script.js`) are located in the same directory.
2. **Open the Application:**
   * Open `index.html` in your preferred web browser.
3. **Create Your Account:**
   * Enter your roll number in the account creation form and click  **"Create Account"** .
   * Your unique account number and initial deposit will be displayed.
4. **Perform Transactions:**
   * Use the deposit and withdrawal forms to add funds or withdraw money.
   * The system will validate the transactions based on the set rules and update the transaction history accordingly.
5. **Download Transaction History:**
   * Click the **"Download Transaction History"** button to save your transaction history as a `.txt` file.

---

## Technologies Used

* **HTML:**
  Provides the structure for forms and information display.
* **CSS:**
  Styles the interface for a clean and modern user experience.
* **Vanilla JavaScript (ES6+):**
  * **Arrow Functions** for concise function expressions.
  * **Array Methods:** `map()`, `reduce()` for data manipulation.
  * **DOM Manipulation:** For real-time updates of account information and transaction history.
  * **Set:** Used for managing unique transaction types (if needed).
