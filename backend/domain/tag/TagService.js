class TagService {
  constructor(tagRepository) {
    this.tagRepository = tagRepository;
  }

  async createTag(tagData) {
    const existingTag = await this.tagRepository.findByName(tagData.name);

    if (existingTag) {
      throw new Error("Tag exists already");
    }

    return this.tagRepository.save(tagData);
  }

  async getTagById(tagId) {
    return this.tagRepository.findById(tagId);
  }
}

module.exports = TagService;
