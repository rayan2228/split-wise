import { User } from "../models/user";

export class UserService {
  constructor() {
    this.userCollection = new Map();
  }
  createUser(name) {
    if (!name.trim() || typeof name !== "string") {
      throw new Error("user name must be a string");
    }
    const createdUser = new User(name);
    if (this.hasUser(name)) {
      throw new Error("user name already exists");
    }
    this.userCollection.set(name, createdUser);
    return createdUser;
  }

  hasUser(name) {
    return this.userCollection.has(name);
  }

  getTotalUser() {
    return this.userCollection.size;
  }

  getAllUsers() {
    return Array.from(this.userCollection.values());
  }

  getUserNames() {
    return Array.from(this.userCollection.keys());
  }

  getUser(name) {
    if (!this.hasUser(name)) {
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
