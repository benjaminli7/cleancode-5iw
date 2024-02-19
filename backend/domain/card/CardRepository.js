const fs = require("fs/promises");
const path = require("path");

class CardRepository {
  constructor(jsonFilePath) {
    this.jsonFilePath = jsonFilePath;
  }

  async getAllCards() {
    try {
      const fileContent = await fs.readFile(this.jsonFilePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      return [];
    }
  }

  async findById(cardId) {
    const allCards = await this.getAllCards();
    return allCards.find((card) => card.id === cardId);
  }

  async save(card) {
    const allCards = await this.getAllCards();
    const newCard = { ...card, id: allCards.length + 1 };

    allCards.push(newCard);

    await fs.writeFile(this.jsonFilePath, JSON.stringify(allCards, null, 2));

    return newCard;
  }
}

module.exports = CardRepository;
