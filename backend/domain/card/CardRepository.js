const Card = require("./Card");

class CardRepository {
  constructor() {
    this.cards = [];
    this.categories = {
      FIRST: "FIRST",
      SECOND: "SECOND",
      THIRD: "THIRD",
      FOURTH: "FOURTH",
      FIFTH: "FIFTH",
      SIXTH: "SIXTH",
      SEVENTH: "SEVENTH",
      DONE: "DONE",
    };
  }

  async getAllCards(tags) {
    if (tags) {
      return this.cards.filter((card) => tags.some((tag) => card.tag === tag));
    }
    return this.cards;
  }

  async findById(cardId) {
    return this.cards.find((card) => card.id === cardId);
  }

  async save(card) {
    try {
      if (!this.categories.hasOwnProperty(card.category)) {
        throw new Error("Invalid category");
      }
      const newCard = new Card(
        this.cards.length + 1,
        card.question,
        card.answer,
        card.category,
        card.tag
      );
      this.cards.push(newCard);
      return newCard;
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while creating the card.");
    }
  }
}

module.exports = CardRepository;
