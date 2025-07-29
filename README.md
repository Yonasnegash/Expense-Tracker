# 📊 Expense Tracker CLI

A simple command-line tool to track your personal expenses, written in Node.js. Add, update, delete, and view your expenses — all from the terminal. Project URL : https://roadmap.sh/projects/expense-tracker

## ✨ Features

- Add an expense with description and amount
- View all expenses in a table
- Update expense details
- Delete an expense by ID
- View total expenses
- View monthly summaries
- Data is stored in a local JSON file

## 🚀 Installation

### 1. Clone the repo
```bash
git clone https://github.com/your-username/expense-tracker-cli.git
cd expense-tracker-cli
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the app
```bash
npm run expense
```

## 🧑‍💻 Usage

**Add Expense**
```bash
add --description 'Lunch' --amount 19.99
```

**List Expenses**
```bash
list
```

**Update Expense**
```bash
update --id 1 --description 'Dinner' --amount 29.99
```

**Delete Expense**
```bash
delete --id 1
```

**Summary all time**
```bash
summary
```

**Summary by month (current year only)**
```bash
summary --month 7
```

## 📁 Data Storage
Expenses are saved to a local file:
```bash
./data/expenses.json
```

Each expense entry includes:
```bash
{
    "id": 1,
    "description": "Lunch",
    "amount": 19.99,
    "createdAt": "2025-07-29T10:00:00.000Z",
    "updatedAt": "2025-07-29T10:00:00.000Z
}
```

## ⚠️ Validation & Error Handling
- Amounts must be positive numbers

- IDs must exist when updating or deleting

- Month must be 1–12

- Empty states are handled gracefully

## License
MIT License
