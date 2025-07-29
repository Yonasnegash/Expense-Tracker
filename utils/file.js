const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'data')
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

module.exports = {
    loadExpenses,
    saveExpenses
}