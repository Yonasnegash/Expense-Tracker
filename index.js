const fs = require('fs')
const path = require('path')
const { program } = require('commander')

const DATA_DIR = path.join(__dirname, 'data')
const FILE_PATH = path.join(DATA_DIR, 'expenses.json')

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR)
}

function loadExpenses() {
    if (!fs.existsSync(FILE_PATH)) return []
    const data = fs.readFileSync(FILE_PATH, 'utf-8')
    return JSON.parse(data) || []
}

function saveExpenses(expenses) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(expenses, null, 2))
}

function add({ description, amount }) {
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

function list() {
    const expenses = loadExpenses()
    if (expenses.length === 0) {
        console.log('No expenses found')
        return
    }

    console.log('Expenses:')
    expenses.forEach((expense) => {
        console.log(`ID: ${expense.id}, Description: ${expense.description}, Amount: ${expense.amount}, Created At: ${expense.createdAt}, Updated At: ${expense.updatedAt}`)
    })
}

function update({id, description, amount}) {
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

function del({id}) {
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

function summary({month}) {
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

program
    .command('add')
    .description('Add a new expense')
    .requiredOption('--description <des>', 'title, or expense description')
    .requiredOption('--amount <number>', 'expense amount')
    .action(add)

program
    .command('list')
    .description('List all expenses')
    .action(list)

program
    .command('update')
    .description('Update an expense')
    .requiredOption('--id <id>', 'expense id')
    .option('--description <desc>', 'title or expense description')
    .option('--amount <number>', 'expense amount')
    .action(update)

program
    .command('delete')
    .description('Delete an expense')
    .requiredOption('--id <id>', 'expense id')
    .action(del)

program
    .command('summary')
    .description('Get a summary of all expenses')
    .option('--month <number>', 'summary for a specific month')
    .action(summary)

program.parse()