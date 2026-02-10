import { UserService } from "./services/user";
import { SplitWiseUI } from "./ui/splitWiseUI";
import { ExpenseService } from "./services/expense";

class SplitWiseInit {
  constructor() {
    this.userService = new UserService();
    this.expenseService = new ExpenseService();
    this.splitWiseUI = null;
  }

  init() {
    try {
      this.splitWiseUI = new SplitWiseUI(this.userService, this.expenseService);
      console.log("SplitWise app is running");
    } catch (error) {
      throw new Error("SplitWise app is not running", error);
    }
  }
}

let spiliwise;

document.addEventListener("DOMContentLoaded", () => {
  spiliwise = new SplitWiseInit();
  spiliwise.init();
});

window.addEventListener("load", () => {
  if (!spiliwise) {
    spiliwise = new SplitWiseInit();
    spiliwise.init();
  }
});
