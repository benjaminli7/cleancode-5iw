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
  constructor(id, question, answer, category, tag) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.tag = tag;
    this.setCategory(category);
  }

  setCategory(category) {
    if (!Object.values(Categories).includes(category)) {
      throw new Error(`Invalid category: ${category}`);
    }
    this.category = category;
  }
}

module.exports = Card;
