const { Command } = require('commander')

const add = require('./commands/add')
const list = require('./commands/list')
const update = require('./commands/update')
const del = require('./commands/delete')
const summary = require('./commands/summary')

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

module.exports = async function runCommand(argv) {
    try {
        await program.parseAsync(argv, { from: 'user'})
    } catch (error) {
        console.error('Command error:', error.message)
    }
}