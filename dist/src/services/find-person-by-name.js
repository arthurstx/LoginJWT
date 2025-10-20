"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPersoByNameUseCase = void 0;
class FindPersoByNameUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ name, page, }) {
        const user = (await this.userRepository.findByName(name, page)) ?? [];
        return { user };
    }
}
exports.FindPersoByNameUseCase = FindPersoByNameUseCase;
//# sourceMappingURL=find-person-by-name.js.map