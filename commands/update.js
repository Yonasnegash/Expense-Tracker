const { loadExpenses, saveExpenses } = require('../utils/file')

module.exports = function update({id, description, amount}) {
    const expenseId = parseInt(id)
    const expenses = loadExpenses()
    const expense = expenses.find(e => e.id === expenseId)

    if (!expense) {
        console.log(`Expense with ID ${expenseId} not found`)
        return
    }

    if (description) expense.description = description
    if (amount !== undefined) {
        const parsedAmount = parseFloat(amount)
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            console.log('Error: Amount must be a positive number')
            return
        }

        expense.amount = parsedAmount
    }

    expense.updatedAt = new Date().toISOString()

    saveExpenses(expenses)
    console.log(`Expense updated successfully`)
}