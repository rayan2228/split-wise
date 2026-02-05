import { DOMValidation } from "./DOMValidation";

export class SplitWiseUI {
  constructor(userService) {
    this.userService = userService;
    this.initialingDOMs();
  }
  // initialingDOMs
  initialingDOMs() {
    this.elements = {
      addUserForm: DOMValidation.domElementChecker("addUserForm"),
      addUserInput: DOMValidation.domElementChecker("addUserInput"),
    };
    return this.elements;
  }

  // bindEvents
  bindEvents() {
    this.elements.addUserForm.addEventListener("submit", (e) =>
      this.handleAddUserForm(e),
    );
    this.elements.addUserInput.addEventListener(
      "input",
      (e) => this.handleAddUserInput,
    );
  }

  handleAddUserForm(e) {
    e.preventDefault();
    const userName = this.handleAddUserInput();
    const createdUser = this.userService.createUser(userName);
    console.log(createdUser);
    return createdUser;
  }

  handleAddUserInput(e) {
    const userName = e.target.value;
    if (!userName.trim()) {
      throw new Error("user name required");
    }
    return userName;
  }

  // initialingOptions
}
