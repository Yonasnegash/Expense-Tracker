const { Command } = require('commander')

const add = require('./commands/add')
const list = require('./commands/list')
const update = require('./commands/update')
const del = require('./commands/delete')
const summary = require('./commands/summary')
const setBudget = require('./commands/set-budget')
const exportExpenses = require('./commands/export-expenses')

const program = new Command()

program
    .name('expense-tracker')
    .description('CLI to manage expenses')
    .version('1.0.0')
    .exitOverride()

program
    .command('add')
    .description('Add a new expense')
    .requiredOption('--description <desc>', 'title, or expense description')
    .requiredOption('--amount <number>', 'expense amount')
    .option('--category <category>', 'Expense category')
    .action(add)

program
    .command('list')
    .description('List all expenses')
    .option('--category <category>', 'Expense category')
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

program
    .command('set-budget')
    .description('Set a budget for a specific month')
    .requiredOption('--month <number>', 'Month in YYYY-MM format')
    .requiredOption('--amount <number>', 'Budget amount')
    .action(setBudget)

program
    .command('export')
    .description('Export expenses to CSV')
    .action(exportExpenses)

module.exports = async function runCommand(argv) {
    try {
        await program.parseAsync(argv, { from: 'user'})
    } catch (error) {
        console.error('Command error:', error.message)
    }
}