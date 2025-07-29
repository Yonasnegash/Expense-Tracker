const readline = require('readline')
const runCommand = require('./runner')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'expense-tracker '
})

console.log('Welcome to Expense Tracker CLI!')
console.log('Type a command or "exit" to quit.')
rl.prompt()

rl.on('line', async (line) => {
    const input = line.trim()

    if (input === 'exit' || input === 'quit') {
        rl.close()
        return
    }

    if (input === '') {
        rl.prompt()
        return
    }

    const args = input.match(/"[^"]+"|\S+/g)?.map(arg =>
        arg.startsWith('"') ? arg.slice(1, -1) : arg
    ) || []

    await runCommand(args)
    rl.prompt()
})

rl.on('close', () => {
    console.log('Goodbye!')
    process.exit(0)
})
