import { UserService } from "./services/user";
import { SplitWiseUI } from "./ui/splitWiseUI";

class SplitWiseInit {
  constructor() {
    this.userService = new UserService();
    this.splitWiseUI = new SplitWiseUI(this.userService);
    console.log("running");
  }
}

new SplitWiseInit();
