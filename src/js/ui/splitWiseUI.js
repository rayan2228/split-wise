import { DOMHelper } from "./DOMHelper";

export class SplitWiseUI {
  constructor(userService, expenseService) {
    this.userService = userService;
    this.expenseService = expenseService;
    this.initialingDOMs();
    this.bindEvents();
    this.initialingOptions();
  }
  // initialingDOMs
  initialingDOMs() {
    this.elements = {
      addUserForm: DOMHelper.domElementChecker("addUserForm"),
      addUserInput: DOMHelper.domElementChecker("addUserInput"),
      paidBySelectBox: DOMHelper.domElementChecker("paid-by"),
    };
    return this.elements;
  }

  // bindEvents
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
      console.log(createdUser);
      this.elements.addUserForm.reset();
    } catch (error) {
      throw new Error("adding user error", error);
    }
  }

  handleAddUserInput(e) {
    const userName = e.target.value;
    return userName;
  }

  // initialingOptions
  initialingOptions() {
    const defaultOption = DOMHelper.createOption("Select User", "");
    this.elements.paidBySelectBox.add(defaultOption);
  }
}
