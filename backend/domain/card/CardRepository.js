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

  async getCardsQuizz() {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const cardsNotDone = this.cards.filter(
      (card) => card.category !== this.categories.DONE
    );
    console.log(cardsNotDone);

    const cardsNotDoneNewOrYesterday = cardsNotDone.filter(
      (card) =>
        card.createdAt.getDate() === now.getDate() ||
        card.updatedAt?.getDate() > yesterday.getDate()
    );
    return cardsNotDoneNewOrYesterday;
  }

  async answerCard(cardId, answer) {
    const card = await this.findById(cardId);
    if (!card) {
      throw new Error(`Card not found with id: ${cardId}`);
    }
    if (answer.isValid) {
      const indexOfCurrentCategory = Object.values(this.categories).indexOf(
        card.category
      );
      const nextCategory = Object.values(this.categories)[
        indexOfCurrentCategory + 1
      ];

      if (!nextCategory) {
        card.setCategory(this.categories.DONE);
        return card;
      }

      card.updatedAt = new Date();
      card.setCategory(nextCategory);
      return card;
    } else {
      card.setCategory(this.categories.FIRST);
    }
    return card;
  }
}

module.exports = CardRepository;
