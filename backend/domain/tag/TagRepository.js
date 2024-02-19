const fs = require("fs/promises");
const path = require("path");

class TagRepository {
  constructor(jsonFilePath) {
    this.jsonFilePath = jsonFilePath;
  }

  async getAllTags() {
    try {
      const fileContent = await fs.readFile(this.jsonFilePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      return [];
    }
  }

  async findById(tagId) {
    const allTags = await this.getAllTags();
    return allTags.find((tag) => tag.id === tagId);
  }

  async findByName(name) {
    const allTags = await this.getAllTags();
    return allTags.find((tag) => tag.name === name);
  }

  async save(tag) {
    const allTags = await this.getAllTags();
    const newTag = { ...tag, id: allTags.length + 1 };

    allTags.push(newTag);

    await fs.writeFile(this.jsonFilePath, JSON.stringify(allTags, null, 2));

    return newTag;
  }
}

module.exports = TagRepository;
