const { parse } = require("path");

class CardService {
  constructor(cardRepository) {
    this.cardRepository = cardRepository;
  }

  async createCard(cardData) {
    return this.cardRepository.save(cardData);
  }

  async getCardById(cardId) {
    return this.cardRepository.findById(cardId);
  }

  async getAllCards(tags) {
    const filteredCards = await this.cardRepository.getAllCards(tags);

    return filteredCards;
  }

  async getCardsQuizz() {
    return await this.cardRepository.getCardsQuizz();
  }

  async answerCard(cardId, answer) {
    if (answer.isValid === undefined) {
      throw new Error("Answer must have a valid field");
    }
    const card = await this.cardRepository.findById(parseInt(cardId));
    if (!card) {
      throw new Error(`Card not found with id: ${cardId}`);
    }
    return await this.cardRepository.answerCard(parseInt(cardId), answer);
  }
}

module.exports = CardService;
