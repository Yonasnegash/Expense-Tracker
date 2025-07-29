const { program } = require('commander')

program
    .command('add')
    .description('Add a new expense')
    .requiredOption('--description', 'title, or expense description')
    .requiredOption('--amount', 'expense amount')
    .action((options) => {
        console.log(options)
    })

program
    .command('list')
    .description('List all expenses')
    .action(() => {
        console.log('Listing all expenses')
    })

program
    .command('update')
    .description('Update an expense')
    .requiredOption('--id', 'expense id')
    .option('--description', 'title or expense description')
    .option('--amount', 'expense amount')
    .action((options) => {
        console.log(options)
    })

program
    .command('delete')
    .description('Delete an expense')
    .requiredOption('--id', 'expense id')
    .action((options) => {
        console.log(options)
    })

program
    .command('summary')
    .description('Get a summary of all expenses')
    .option('--month', 'summary for a specific month')
    .action((options) => {
        console.log(options)
    })

program.parse()