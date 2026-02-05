export class Expense {
  constructor(paidBy, amount, description = "no description") {
    if (!paidBy.trim() || typeof paidBy !== "string") {
      throw new Error("paid by  must be a string type");
    }
    if (!amount.trim() || typeof amount !== "number" || amount <= 0) {
      throw new Error("amount must be a positive number");
    }
    this.paidBy = paidBy.trim();
    this.amount = parseFloat(amount.toFixed(2));
    this.description = description.trim();
    this.date = new Date().toISOString();
    this.id = this.generateId();
  }

  generateId() {
    return crypto.randomUUID();
  }
}
