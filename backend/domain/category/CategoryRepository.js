const fs = require("fs/promises");
const path = require("path");

class CategoryRepository {
  constructor(jsonFilePath) {
    this.jsonFilePath = jsonFilePath;
  }

  async getAllCategories() {
    try {
      const fileContent = await fs.readFile(this.jsonFilePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      return [];
    }
  }
}

module.exports = CategoryRepository;
