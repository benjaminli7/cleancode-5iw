const fs = require("fs/promises");
const path = require("path");

class UserRepository {
  constructor(jsonFilePath) {
    this.jsonFilePath = jsonFilePath;
  }

  async getAllUsers() {
    try {
      const fileContent = await fs.readFile(this.jsonFilePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      return [];
    }
  }

  async findById(userId) {
    const allUsers = await this.getAllUsers();
    return allUsers.find((user) => user.id === userId);
  }

  async findByEmail(email) {
    const allUsers = await this.getAllUsers();
    return allUsers.find((user) => user.email === email);
  }

  async save(user) {
    const allUsers = await this.getAllUsers();
    const newUser = { ...user, id: allUsers.length + 1 };

    allUsers.push(newUser);

    await fs.writeFile(this.jsonFilePath, JSON.stringify(allUsers, null, 2));

    return newUser;
  }

}

module.exports = UserRepository;
