import { DOMHelper } from "./DOMHelper";

export class SplitWiseUI {
  constructor(userService, expenseService) {
    this.userService = userService;
    this.expenseService = expenseService;
    this.initialingDOMs();
    this.bindEvents();
    this.initialingOptions();
  }

  initialingDOMs() {
    this.elements = {
      addUserForm: DOMHelper.domElementChecker("addUserForm"),
      addUserInput: DOMHelper.domElementChecker("addUserInput"),
      paidBySelectBox: DOMHelper.domElementChecker("paid-by"),
    };
    return this.elements;
  }

  bindEvents() {
    this.elements.addUserForm.addEventListener("submit", (e) =>
      this.handleAddUserForm(e),
    );
    this.elements.addUserInput.addEventListener("input", (e) =>
      this.handleAddUserInput(e),
    );
  }

  handleAddUserForm(e) {
    try {
      e.preventDefault();
      const userName = this.elements.addUserInput.value;
      if (!userName.trim()) {
        throw new Error("user name required");
      }
      const createdUser = this.userService.createUser(userName);
      this.addUserIntoOption(createdUser.name);
      this.elements.addUserForm.reset();
    } catch (error) {
      throw new Error("adding user error", error);
    }
  }

  handleAddUserInput(e) {
    const userName = e.target.value;
    return userName;
  }

  addUserIntoOption(userName) {
    const paidByUser = DOMHelper.createOption(userName, userName);
    this.elements.paidBySelectBox.add(paidByUser);
  }

  initialingOptions() {
    const defaultOption = DOMHelper.createOption("Select User", "");
    this.elements.paidBySelectBox.add(defaultOption);
  }
}
