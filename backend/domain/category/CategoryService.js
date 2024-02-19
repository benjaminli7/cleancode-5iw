class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getAllCategories() {
    return this.categoryRepository.getAllCategories();
  }
}

module.exports = CategoryService;
