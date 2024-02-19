const CardRepository = require("./CardRepository");

class CardService {
  constructor() {
    this.cardRepository = new CardRepository();
  }

  async createCard(cardData) {
    return this.cardRepository.save(cardData);
  }

  async getCardById(cardId) {
    return this.cardRepository.findById(cardId);
  }

  async getAllCards() {
    return this.cardRepository.getAllCards();
  }

  async getCardsQuizz() {
    
  }
}

module.exports = CardService;
