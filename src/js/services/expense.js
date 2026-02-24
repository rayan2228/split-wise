import { Expense } from "../models/expense";

export class ExpenseService {
  constructor(userService) {
    this.allExpenses = [];
    this.userService = userService;
  }

  createExpense(paidBy, amount, description) {
    if (!this.userService.hasUser(paidBy)) {
      throw new Error("user not found");
    }
    const expense = new Expense(paidBy, amount, description);
    this.allExpenses.push(expense);
    return expense;
  }

  getAllExpense() {
    return [...this.allExpenses];
  }

  getTotalExpense() {
    return this.allExpenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    );
  }

  getExpenseByUser(userName) {
    if (!this.userService.hasUser(userName)) {
      throw new Error("user not found");
    }
    return this.allExpenses.filter(({ paidBy }) => paidBy === userName);
  }

  deleteExpense(expenseId) {
    return (this.allExpenses = this.allExpenses.filter(
      ({ id }) => id !== expenseId,
    ));
  }

  deleteAllExpense() {
    return (this.allExpenses = []);
  }

  simplifyExpense() {
    const userCount = this.userService.getTotalUser();
    if (!userCount) return [];

    const net = {};
    const userNames = this.userService.getUserNames();

    // initialize balances
    userNames.forEach((name) => (net[name] = 0));

    // calculate net balances
    this.allExpenses.forEach((expense) => {
      const share = expense.amount / userCount;

      userNames.forEach((name) => {
        if (name === expense.paidBy) {
          net[name] += expense.amount - share;
        } else {
          net[name] -= share;
        }
      });
    });

    return this.calculateSettlements(net);
  }

  calculateSettlements(net) {
    const result = [];

    const names = Object.keys(net)
      .filter((name) => net[name] !== 0)
      .sort((a, b) => net[a] - net[b]);

    let i = 0;
    let j = names.length - 1;

    while (i < j) {
      const debtor = names[i];
      const creditor = names[j];

      const amount = Math.min(-net[debtor], net[creditor]);

      if (amount > 0) {
        result.push(`${debtor} owes ${creditor} ${amount.toFixed(2)}`);

        net[debtor] += amount;
        net[creditor] -= amount;
      }

      if (net[debtor] === 0) i++;
      if (net[creditor] === 0) j--;
    }
    return result;
  }
}
