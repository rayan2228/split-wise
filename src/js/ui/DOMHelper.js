export class DOMHelper {
  static domElementChecker(elementId) {
    if (!document.getElementById(elementId)) {
      throw new Error(`dom element ${elementId} not found`);
    }
    return document.getElementById(elementId);
  }

  static createOption(text, value, ...props) {
    return new Option(text, value, ...props);
  }

  static createList(children, className) {
    const li = document.createElement("li");
    li.innerHTML = children;

    if (className) {
      if (Array.isArray(className)) {
        li.classList.add(...className);
      } else {
        li.classList.add(className);
      }
    }

    return li;
  }
  static appendWithFragment(parent, items) {
    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.appendChild(item));
    parent.appendChild(fragment);
  }
  static cleanUi(element) {
    element.innerHTML = "";
  }
}
