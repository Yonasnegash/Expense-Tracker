const fs = require('fs');
const path = require('path');
const { loadExpenses } = require('../utils/file');

module.exports = function exportExpenses() {
  const expenses = loadExpenses();

  if (expenses.length === 0) {
    console.log('No expenses to export.');
    return;
  }

  // Define CSV header
  const header = 'Description,Amount,Date\n';

  // Convert each expense to a CSV line
  const csvRows = expenses.map(exp => {
    const description = `"${exp.description.replace(/"/g, '""')}"`;
    const amount = exp.amount;
    const date = new Date(exp.createdAt).toISOString();
    return `${description},${amount},${date}`;
  });

  const csvContent = header + csvRows.join('\n');
  const filePath = path.join(__dirname, '../data/expenses.csv');

  fs.writeFileSync(filePath, csvContent);
  console.log(`✅ Expenses exported to ${filePath}`);
};
