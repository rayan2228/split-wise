export class User {
  constructor(name) {
    if (!name.trim() || typeof name !== "string") {
      throw new Error("user name must be a string type");
    }
    this.name = name.trim();
    this.id = this.generateId();
  }

  generateId() {
    return crypto.randomUUID();
  }
}
