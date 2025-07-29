const { loadExpenses, loadBugdet } = require('../utils/file')

module.exports = function summary({month}) {
    const expenses = loadExpenses()
    const budgets = loadBugdet() || {}
    let filtered = expenses

    const currentYear = new Date().getFullYear()

    if (month) {
        const m = parseInt(month)
        if (isNaN(m) || m < 1 || m > 12) {
            console.error('Invalid month. Use number between 1 and 12.')
            return
        }

        const monthKey = `${currentYear}-${String(m).padStart(2, '0')}`
    
        filtered = expenses.filter(e => {
            const d = new Date(e.createdAt)
            return d.getMonth() + 1 === m && d.getFullYear() === currentYear
        })

        const total = filtered.reduce((sum, e) => sum + e.amount, 0)

        const budget = budgets[monthKey]
        
        const monthName = new Date(currentYear, m - 1).toLocaleString('default', { month: 'long' })

        console.log(`Total expenses for ${monthName} (${monthKey}): $${total}`)

        if (budget !== undefined) {
            console.log(`Budget for ${monthKey}: $${budget}`)
            if (total > budget) {
                console.log(`⚠️  Warning: You have exceeded your budget by $${(total - budget).toFixed(2)}`)
            } else {
                console.log(`Remaining budget for ${monthKey}: $${(budget - total).toFixed(2)}`)
            }
        } else {
            console.log(`No budget set for ${monthKey}`)
        }

        return
    }

    const total = filtered.reduce((sum, e) => sum + e.amount, 0)

    console.log(`Total expenses: $${total}`)
}