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
    console.log(tags);
    return await this.cardRepository.getAllCards(tags);
  }

  async getCardsQuizz() {}
}

module.exports = CardService;
