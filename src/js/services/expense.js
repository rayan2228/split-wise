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
}
