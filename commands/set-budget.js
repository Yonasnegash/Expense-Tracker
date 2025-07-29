const { saveBudget, loadBugdet } = require('../utils/file');

module.exports = function setBudget({month, amount}) {
    const parsedAmount = parseFloat(amount)
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        console.log('Error: Amount must be a positive number')
        return
    }

    const budgets = loadBugdet() || {}

    budgets[month] = parsedAmount
    saveBudget(budgets)

    console.log(`Budget for month ${month} set to ${amount}`)
}