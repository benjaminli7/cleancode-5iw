class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new Error("Email already in use");
    }

    return this.userRepository.save(userData);
  }

  async getUserById(userId) {
    return this.userRepository.findById(userId);
  }

}

module.exports = UserService;
