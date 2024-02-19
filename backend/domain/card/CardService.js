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
}

module.exports = CardService;
