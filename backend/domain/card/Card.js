// domain/card.js
class Card {
  constructor(id, question, answer, tag, category) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.category = category;
  }
}

module.exports = Card;
