import { Expense } from "../models/expense";
import { DOMHelper } from "./DOMHelper";
import { errorToastify, successToastify } from "./tostify";

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
      userList: DOMHelper.domElementChecker("userList"),
      expensePaidBy: DOMHelper.domElementChecker("expensePaidBy"),
      addExpenseForm: DOMHelper.domElementChecker("addExpenseForm"),
      expenseDescription: DOMHelper.domElementChecker("expenseDescription"),
      expenseAmount: DOMHelper.domElementChecker("expenseAmount"),
    };
    return this.elements;
  }

  bindEvents() {
    this.elements.addUserForm.addEventListener("submit", (e) =>
      this.handleAddUserForm(e),
    );
    this.elements.addUserInput.addEventListener("input", (e) => e.target.value);
    this.elements.addExpenseForm.addEventListener("submit", (e) =>
      this.handleAddExpenseForm(e),
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
      this.showUserOnUi(createdUser.name);
      successToastify(`${createdUser.name} user is created`);
      this.elements.addUserForm.reset();
    } catch (error) {
      errorToastify(error);
    }
  }

  showUserOnUi(userName) {
    const userListTemplate = `<h6>${userName}</h6>
      <button>
        <i data-lucide="x" class="text-red-400 cursor-pointer"></i>
      </button>`;
    const li = DOMHelper.createList(userListTemplate, "user-list");
    this.elements.userList.append(li);
    lucide.createIcons();
  }

  addUserIntoOption(userName) {
    const paidByUser = DOMHelper.createOption(userName, userName);
    this.elements.expensePaidBy.add(paidByUser);
  }

  handleAddExpenseForm(e) {
    try {
      e.preventDefault();
      const expenseDescription = this.elements.expenseDescription.value;
      const expenseAmount = this.elements.expenseAmount.valueAsNumber;
      const expensePaidBy = this.elements.expensePaidBy.value;
      if (!expensePaidBy) {
        throw new Error("expense paid by user is required");
      }
      if (!expenseAmount || expenseAmount <= 0) {
        throw new Error("expense amount must be grater than 0");
      }
      const newExpense = new Expense(
        expensePaidBy,
        expenseAmount,
        expenseDescription,
      );
      successToastify(
        `${newExpense.amount} is paided by ${newExpense.paidBy} `,
      );
      this.elements.expenseDescription.value = "";
      this.elements.expenseAmount.valueAsNumber = 0.0;
    } catch (error) {
      errorToastify(error);
    }
  }

  initialingOptions() {
    const defaultOption = DOMHelper.createOption("Select User", "");
    this.elements.expensePaidBy.add(defaultOption);
  }
}
