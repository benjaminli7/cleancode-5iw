const Card = require("./Card");

class CardRepository {
  constructor() {
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
    this.cards = [
      // Catégorie 1
      new Card(
        1,
        "Question 1",
        "Answer 1",
        this.categories.FIRST,
        "geography",
        new Date(),
        new Date()
      ),
      new Card(
        2,
        "Question 2",
        "Answer 2",
        this.categories.FIRST,
        "geography",
        new Date(),
        new Date()
      ),

      // Catégorie 2
      new Card(
        3,
        "Question 3",
        "Answer 3",
        this.categories.SECOND,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 1)
      ),
      new Card(
        4,
        "Question 4",
        "Answer 4",
        this.categories.SECOND,
        "geography",
        new Date(),
        new Date()
      ),

      // Catégorie 3
      new Card(
        5,
        "Question 5",
        "Answer 5",
        this.categories.THIRD,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 5)
      ),
      new Card(
        6,
        "Question 6",
        "Answer 6",
        this.categories.THIRD,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 2)
      ),

      // Catégorie 4
      new Card(
        7,
        "Question 7",
        "Answer 7",
        this.categories.FOURTH,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 9)
      ),
      new Card(
        8,
        "Question 8",
        "Answer 8",
        this.categories.FOURTH,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 3)
      ),

      // Catégorie 5
      new Card(
        9,
        "Question 9",
        "Answer 9",
        this.categories.FIFTH,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 17)
      ),
      new Card(
        10,
        "Question 10",
        "Answer 10",
        this.categories.FIFTH,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 14)
      ),

      // Catégorie 6
      new Card(
        11,
        "Question 11",
        "Answer 11",
        this.categories.SIXTH,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 33)
      ),
      new Card(
        12,
        "Question 12",
        "Answer 12",
        this.categories.SIXTH,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 30)
      ),

      // Catégorie 7
      new Card(
        13,
        "Question 13",
        "Answer 13",
        this.categories.SEVENTH,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 65)
      ),
      new Card(
        14,
        "Question 14",
        "Answer 14",
        this.categories.SEVENTH,
        "geography",
        new Date(),
        new Date().setDate(new Date().getDate() - 60)
      ),
    ];
  }

  async getAllCards(tags) {
    if (tags) {
      return this.cards
        .filter((card) => tags.some((tag) => card.tag === tag))
        .map(({ createdAt, updatedAt, ...card }) => card);
    }
    return this.cards.map(({ createdAt, updatedAt, ...card }) => card);
  }

  async findById(cardId) {
    return this.cards.find((card) => card.id === cardId);
  }

  async save(card) {
    try {
      const newCard = new Card(
        this.cards.length + 1,
        card.question,
        card.answer,
        (card.category = this.categories.FIRST),
        card.tag
      );
      this.cards.push(newCard);
      return {
        id: newCard.id,
        question: newCard.question,
        answer: newCard.answer,
        tag: newCard.tag,
      };
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while creating the card.");
    }
  }

  async getCardsQuizz(quizzDate) {
    const date = quizzDate ? new Date(quizzDate) : new Date();
    const cardsNotDoneNewOr2PowIndex = this.cards
      .filter((card) => {
        const updatedAt = new Date(card.updatedAt);
        const diff = date - updatedAt;
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const categoryIndex =
          Object.values(this.categories).indexOf(card.category) + 1;
        const expectedDays = Math.pow(2, categoryIndex - 1);
        return (
          card.category !== this.categories.DONE &&
          (diffDays === 0 || diffDays >= expectedDays)
        );
      })
      .map(({ createdAt, updatedAt, ...card }) => card);
    return cardsNotDoneNewOr2PowIndex;
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
