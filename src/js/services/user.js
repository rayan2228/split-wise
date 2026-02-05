import { User } from "../models/user.js";

export class UserService {
  constructor() {
    this.userCollection = new Map();
  }
  createUser(name) {
    if (!name.trim() || typeof name !== "string") {
      throw new Error("user name must be a string type");
    }
    const createdUser = new User(name);
    if (this.userCollection.has(name)) {
      throw new Error("user name already exists");
    }
    this.userCollection.set(name, createdUser);
  }

  getAllUser() {
    return Array.from(this.userCollection.values());
  }

  getUser(name) {
    if (!this.userCollection.has(name)) {
      throw new Error("user not found");
    }
    return this.userCollection.get(name);
  }

  deleteUser(name) {
    if (!this.userCollection.has(name)) {
      throw new Error("user not found");
    }
    return this.userCollection.delete(name);
  }

  deleteAllUser() {
    return this.userCollection.clear();
  }
}
