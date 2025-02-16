// Global account object (will be created upon account creation)
let account = null;

// Account Creation Handler
document.getElementById('accountForm').addEventListener('submit', event => {
  event.preventDefault();
  const rollNumber = document.getElementById('studentRoll').value.trim();
  if (!rollNumber) return; // Ensure roll number is provided

  // Generate a unique account number (e.g., prefix "ACC" followed by the roll number)
  const accountNumber = `ACC${rollNumber}`;

  // Set initial deposit using the last digit of the roll number multiplied by 1000 PKR
  const lastDigit = parseInt(rollNumber.slice(-1), 10);
  const initialDeposit = lastDigit * 1000;

  // Create the account object with an initial transaction
  account = {
    rollNumber,
    accountNumber,
    transactions: [
      { type: 'Initial Deposit', amount: initialDeposit, date: new Date() }
    ]
  };

  // Update UI: Hide account creation section and display account info, transactions, and history
  document.getElementById('accountCreation').style.display = 'none';
  document.getElementById('accountInfo').style.display = 'block';
  document.getElementById('transactions').style.display = 'block';
  document.getElementById('history').style.display = 'block';

  // Display account information
  document.getElementById('accountNumber').textContent = account.accountNumber;
  document.getElementById('initialDeposit').textContent = initialDeposit;
  updateBalanceDisplay();
  updateTransactionHistory();
});

// Function to update the current balance (using reduce() on the transactions array)
const updateBalanceDisplay = () => {
  const balance = account.transactions.reduce((acc, tx) => acc + tx.amount, 0);
  document.getElementById('currentBalance').textContent = balance;
};

// Function to update the transaction history list dynamically
const updateTransactionHistory = () => {
  const transactionListEl = document.getElementById('transactionList');
  transactionListEl.innerHTML = '';
  account.transactions.forEach(tx => {
    const li = document.createElement('li');
    const dateStr = tx.date.toLocaleString();
    li.textContent = `${dateStr} - ${tx.type}: ${tx.amount > 0 ? '+' : ''}${tx.amount} PKR`;
    transactionListEl.appendChild(li);
  });
};

const messageEl = document.getElementById('message');

// Deposit Function (using arrow syntax)
const deposit = () => {
  messageEl.textContent = '';
  const depositAmount = parseInt(document.getElementById('depositAmount').value, 10);
  if (isNaN(depositAmount) || depositAmount <= 0) {
    messageEl.textContent = 'Please enter a valid deposit amount.';
    return;
  }
  // Ensure deposit is a multiple of the roll number (converted to an integer)
  const rollNumInt = parseInt(account.rollNumber, 10);
  if (depositAmount % rollNumInt !== 0) {
    messageEl.textContent = `Deposit amount must be a multiple of ${account.rollNumber}.`;
    return;
  }
  // Add the deposit transaction
  account.transactions.push({ type: 'Deposit', amount: depositAmount, date: new Date() });
  updateBalanceDisplay();
  updateTransactionHistory();
  document.getElementById('depositAmount').value = '';
};

// Withdrawal Function (using arrow syntax)
const withdraw = () => {
  messageEl.textContent = '';
  const withdrawAmount = parseInt(document.getElementById('withdrawAmount').value, 10);
  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    messageEl.textContent = 'Please enter a valid withdrawal amount.';
    return;
  }
  // Calculate current balance
  const currentBalance = account.transactions.reduce((acc, tx) => acc + tx.amount, 0);
  // Ensure withdrawal does not exceed 80% of current balance
  if (withdrawAmount > currentBalance * 0.8) {
    messageEl.textContent = `Withdrawal amount cannot exceed 80% of current balance (${(currentBalance * 0.8).toFixed(2)} PKR).`;
    return;
  }
  // Add the withdrawal transaction (as a negative value)
  account.transactions.push({ type: 'Withdrawal', amount: -withdrawAmount, date: new Date() });
  updateBalanceDisplay();
  updateTransactionHistory();
  document.getElementById('withdrawAmount').value = '';
};

// Event listeners for deposit and withdrawal buttons
document.getElementById('depositBtn').addEventListener('click', deposit);
document.getElementById('withdrawBtn').addEventListener('click', withdraw);

// Bonus: Download Transaction History as a .txt file
document.getElementById('downloadBtn').addEventListener('click', () => {
  let content = `Account Number: ${account.accountNumber}\n`;
  const initialTx = account.transactions.find(tx => tx.type === 'Initial Deposit');
  content += `Initial Deposit: ${initialTx.amount} PKR\n\n`;
  content += 'Transaction History:\n';
  account.transactions.forEach(tx => {
    const dateStr = tx.date.toLocaleString();
    content += `${dateStr} - ${tx.type}: ${tx.amount > 0 ? '+' : ''}${tx.amount} PKR\n`;
  });
  const balance = account.transactions.reduce((acc, tx) => acc + tx.amount, 0);
  content += `\nCurrent Balance: ${balance} PKR\n`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transaction_history.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
