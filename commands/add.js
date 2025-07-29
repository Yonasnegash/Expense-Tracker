const { loadExpenses, saveExpenses } = require('../utils/file')

module.exports = function add({ description, amount }) {
    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        console.log('Error: Amount must be a positive number')
        return
    }

    const expenses = loadExpenses()

    const newId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1
    const now = new Date().toISOString()

    const newExpense = { id: newId, description, amount: parsedAmount, createdAt: now, updatedAt: now }

    expenses.push(newExpense)
    saveExpenses(expenses)

    console.log(`Expense added successfully (ID: ${newId}})`)
}