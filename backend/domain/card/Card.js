// domain/card.js

const Categories = {
  FIRST: "FIRST",
  SECOND: "SECOND",
  THIRD: "THIRD",
  FOURTH: "FOURTH",
  FIFTH: "FIFTH",
  SIXTH: "SIXTH",
  SEVENTH: "SEVENTH",
  DONE: "DONE",
};

class Card {
  constructor(id, question, answer, category, tag, createdAt, updatedAt) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.tag = tag;
    this.setCategory(category);
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  setCategory(category) {
    if (!Object.values(Categories).includes(category)) {
      throw new Error(`Invalid category: ${category}`);
    }
    this.category = category;
  }
  setUpdatedAt(newDate) {
    this.updatedAt = newDate;
  }
}

module.exports = Card;
