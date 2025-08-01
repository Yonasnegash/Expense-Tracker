const { loadExpenses } = require('../utils/file')

module.exports = function list({category}) {
    const expenses = loadExpenses()
    if (expenses.length === 0) {
        console.log('No expenses found')
        return
    }

    let filteredExpenses = expenses

    if (category) {
        filteredExpenses = expenses.filter(expense => expense.category === category)
    }

    console.log('ID  Date         Description        Category      Amount')
    filteredExpenses.forEach((expense) => {
        const date = expense.createdAt.slice(0, 10)
        console.log(`${expense.id}   ${date}   ${expense.description.padEnd(18)} ${expense.category ?  expense.category.padEnd(14) : 'Uncategorized'} $${expense.amount}`)
    })
}