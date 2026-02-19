import { UserService } from "./services/user";
import { SplitWiseUI } from "./ui/splitWiseUI";
import { ExpenseService } from "./services/expense";
import { errorToastify } from "./ui/tostify";

class SplitWiseInit {
  constructor() {
    this.userService = new UserService();
    this.expenseService = new ExpenseService();
    this.splitWiseUI = null;
  }

  init() {
    try {
      lucide.createIcons();
      this.splitWiseUI = new SplitWiseUI(this.userService, this.expenseService);
      console.log("SplitWise app is running");
    } catch (error) {
      errorToastify(error);
      throw new Error("SplitWise app is not running", error);
    }
  }
}

let spiltiwise;

document.addEventListener("DOMContentLoaded", () => {
  spiltiwise = new SplitWiseInit();
  spiltiwise.init();
});

window.addEventListener("load", () => {
  if (!spiltiwise) {
    spiltiwise = new SplitWiseInit();
    spiltiwise.init();
  }
});
