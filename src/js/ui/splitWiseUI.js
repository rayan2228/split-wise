import { DOMValidation } from "./DOMValidation";

export class SplitWiseUI {
  constructor(userService) {
    this.userService = userService;
    this.initialingDOMs();
    this.bindEvents();
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
}
