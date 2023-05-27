const transactionForm = document.getElementById('transactionForm');
const descriptionInput = document.getElementById('descriptionInput');
const amountInput = document.getElementById('amountInput');
const typeSelect = document.getElementById('typeSelect');
const transactionList = document.getElementById('transactionList');
const balanceAmount = document.getElementById('balanceAmount');

let transactions = [];

transactionForm.addEventListener('submit', addTransaction);

function addTransaction(event) {
  event.preventDefault();

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type
  };

  transactions.push(transaction);
  renderTransactionList();
  updateBalance();

  descriptionInput.value = '';
  amountInput.value = '';
  typeSelect.value = 'income';
}

function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  renderTransactionList();
  updateBalance();
}

function renderTransactionList() {
  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const listItem = document.createElement('div');
    listItem.classList.add('transaction');

    const typeClass = transaction.type === 'income' ? 'income' : 'expense';
    listItem.classList.add(typeClass);

    listItem.innerHTML = `
      <span class="description">${transaction.description}</span>
      <span class="amount">${formatCurrency(transaction.amount)}</span>
      <button class="deleteButton" onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;

    transactionList.appendChild(listItem);
  });
}

function updateBalance() {
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpense;
  balanceAmount.textContent = formatCurrency(balance);
}

function formatCurrency(amount) {
  return '$' + amount.toFixed(2);
}
