import moment from "moment";
import { DOMHelper } from "./DOMHelper";
import { errorToastify, successToastify } from "./tostify";

export class SplitWiseUI {
  constructor(userService, expenseService, storageService) {
    this.userService = userService;
    this.expenseService = expenseService;
    this.storageService = storageService;
    this.initialingDOMs();
    this.bindEvents();
    this.initialingOptions();
    this.elements.totalExpense.innerText =
      this.expenseService.getTotalExpense();
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
      expenseList: DOMHelper.domElementChecker("expenseList"),
      totalExpense: DOMHelper.domElementChecker("totalExpense"),
      calculateSplit: DOMHelper.domElementChecker("calculateSplit"),
      shouldReceive: DOMHelper.domElementChecker("shouldReceive"),
      shouldPay: DOMHelper.domElementChecker("shouldPay"),
      suggestedSettlements: DOMHelper.domElementChecker("suggestedSettlements"),
      exportBtn: DOMHelper.domElementChecker("exportBtn"),
      importBtn: DOMHelper.domElementChecker("importBtn"),
      inputFile: DOMHelper.domElementChecker("inputFile"),
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
    this.elements.calculateSplit.addEventListener("click", () =>
      this.calculateSplit(),
    );
    this.elements.exportBtn.addEventListener("click", () =>
      this.handleExportData(),
    );
    this.elements.importBtn.addEventListener("click", () =>
      this.elements.inputFile.click(),
    );
    this.elements.inputFile.addEventListener("change", (e) =>
      this.handleImportData(e),
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
    const li = DOMHelper.createList(userListTemplate, "list");

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
      const newExpense = this.expenseService.createExpense(
        expensePaidBy,
        expenseAmount,
        expenseDescription,
      );
      successToastify(`${newExpense.amount} is paid by ${newExpense.paidBy} `);
      this.elements.expenseDescription.value = "";
      this.elements.expenseAmount.valueAsNumber = 0.0;
      this.showExpenseOnUi(newExpense);
    } catch (error) {
      errorToastify(error);
    }
  }

  showExpenseOnUi(expense) {
    this.elements.totalExpense.innerText =
      this.expenseService.getTotalExpense();
    const expenseListTemplate = `<div>
        <h6>${expense.description || "untitled"}</h6> 
        <div class="flex gap-2 items-center text-sm text-gray-400">
          <h6>Paid by ${expense.paidBy}</h6>
          <div class="flex items-center gap-2">
            <i data-lucide="calendar" class="w-4"></i>
            <h6>${moment(expense.date).format("MMMM Do YYYY, h:mm a")}</h6>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-6">
        <h5 class="text-green-400">
          &#2547 <span>${expense.amount}</span>
        </h5>
        <button>
          <i data-lucide="trash" class="text-red-400 cursor-pointer w-5"></i>
        </button>
      </div>`;
    const li = DOMHelper.createList(expenseListTemplate, "list");

    this.elements.expenseList.append(li);
    lucide.createIcons();
  }

  calculateSplit() {
    try {
      const result = this.expenseService.simplifyExpense();
      this.displaySplitResult(result);
    } catch (error) {
      errorToastify(`Error simplifying Expense ${error}`);
    }
  }

  displaySplitResult(result) {
    this.cleanSplitResults();

    const receiveItems = result.shouldReceive.map(({ name, amount }) =>
      DOMHelper.createList(
        `<h6>${name}</h6>
       <h6 class="text-green-400">&#2547; +${amount}</h6>`,
        ["flex", "items-center", "justify-between"],
      ),
    );

    DOMHelper.appendWithFragment(this.elements.shouldReceive, receiveItems);

    const payItems = result.shouldPay.map(({ name, amount }) =>
      DOMHelper.createList(
        `<h6>${name}</h6>
       <h6 class="text-red-400">&#2547; ${amount}</h6>`,
        ["flex", "items-center", "justify-between"],
      ),
    );

    DOMHelper.appendWithFragment(this.elements.shouldPay, payItems);

    const settlementItems = result.suggestedSettlements.map(
      ({ creditor, debtor, amount }) =>
        DOMHelper.createList(
          `
        <div class="flex items-center gap-2">
          <h6>${debtor}</h6>
          <i data-lucide="arrow-right" class="text-gray-300 w-4"></i>
          <h6>${creditor}</h6>
        </div>
        <h6 class="text-green-400">&#2547; +${amount}</h6>
        `,
          [
            "flex",
            "items-center",
            "justify-between",
            "bg-gray-700",
            "border",
            "p-2",
            "rounded-md",
            "border-gray-600",
          ],
        ),
    );

    DOMHelper.appendWithFragment(
      this.elements.suggestedSettlements,
      settlementItems,
    );

    lucide.createIcons();
  }
  cleanSplitResults() {
    const { shouldPay, shouldReceive, suggestedSettlements } = this.elements;
    DOMHelper.cleanUi(shouldReceive);
    DOMHelper.cleanUi(shouldPay);
    DOMHelper.cleanUi(suggestedSettlements);
  }
  initialingOptions() {
    const defaultOption = DOMHelper.createOption("Select User", "");
    this.elements.expensePaidBy.add(defaultOption);
  }

  handleExportData() {
    this.storageService.exportData();
  }
  async handleImportData(e) {
    try {
      const file = e.target.files[0];
      if (!file) return;
      await this.storageService.importData(file);
      this.refreshUi();
      successToastify("data imported successfully");
    } catch (error) {
      errorToastify("data not imported");
    } finally {
      e.target.value = "";
    }
  }

  refreshUi() {
    // Refresh user select options
    DOMHelper.removeElement(this.elements.expensePaidBy);
    this.initialingOptions();
    this.userService
      .getUserNames()
      .forEach((name) => this.addUserIntoOption(name));
    // Refresh expense list
    DOMHelper.removeElement(this.elements.expenseList);
    this.expenseService
      .getAllExpense()
      .forEach((expense) => this.showExpenseOnUi(expense));
    // clear result
    DOMHelper.removeElement(this.elements.shouldPay);
    DOMHelper.removeElement(this.elements.shouldReceive);
    DOMHelper.removeElement(this.elements.suggestedSettlements);
  }
}
