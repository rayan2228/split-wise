export class DOMValidation {
  static domElementChecker(elementId) {
    if (!document.getElementById(elementId)) {
      throw new Error(`dom element ${elementId} not found`);
    }
    return document.getElementById(elementId);
  }
}
