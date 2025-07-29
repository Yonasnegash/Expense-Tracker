const { loadExpenses } = require('../utils/file')

module.exports = function summary({month}) {
    const expenses = loadExpenses()
    let filtered = expenses

    if (month) {
        const m = parseInt(month)
        if (isNaN(m) || m < 1 || m > 12) {
            console.error('Invalid month. Use number between 1 and 12.')
            return
        }
    
        const currentYear = new Date().getFullYear()
        filtered = expenses.filter(e => {
        const d = new Date(e.createdAt)
        return d.getMonth() + 1 === m && d.getFullYear() === currentYear
        })

        const total = filtered.reduce((sum, e) => sum + e.amount, 0)
        console.log(`Total expenses for ${new Date(currentYear, m - 1).toLocaleString('default', { month: 'long' })}: $${total}`)
        return
    }

    const total = filtered.reduce((sum, e) => sum + e.amount, 0)

    console.log(`Total expenses: $${total}`)
}