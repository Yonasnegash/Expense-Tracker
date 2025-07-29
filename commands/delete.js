const { loadExpenses, saveExpenses } = require('../utils/file');

module.exports = function del({id}) {
    const expenseId = parseInt(id)
    if (isNaN(expenseId)) {
        console.log('Error: Invalid expense ID')
        return
    }

    const expenses = loadExpenses()

    const index = expenses.findIndex(e => e.id === expenseId)
    if (index === -1) {
        console.log(`Expense with ID ${expenseId} not found`)
        return
    }

    expenses.splice(index, 1)
    saveExpenses(expenses)
    console.log('Expense deleted successfully.')
}