const { loadExpenses } = require('../utils/file')

module.exports = function list() {
    const expenses = loadExpenses()
    if (expenses.length === 0) {
        console.log('No expenses found')
        return
    }

    console.log('ID  Date         Description        Amount')
    expenses.forEach((expense) => {
        const date = expense.createdAt.slice(0, 10)
        console.log(`${expense.id}   ${date}   ${expense.description.padEnd(18)} $${expense.amount}`)
    })
}