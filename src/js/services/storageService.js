export class StorageService {
  constructor(userService, expenseService) {
    this.userService = userService;
    this.expenseService = expenseService;
  }
  exportData() {
    const data = {
      users: this.userService.getAllUsers().map((user) => user),
      expenses: this.expenseService.getAllExpense().map((expense) => expense),
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importData(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("no file selected"));
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (!data.users || !data.expenses) {
            throw new Error("invalid file format");
          }
          this.userService.importUsers(data.users);
          this.expenseService.importExpenses(data.expenses);
          resolve(data);
        } catch (error) {
          reject(`failed to import data ${error}`);
        }
      });
      reader.addEventListener("error", () => {
        reject(new Error("Error reading file"));
      });

      reader.readAsText(file);
    });
  }
}
