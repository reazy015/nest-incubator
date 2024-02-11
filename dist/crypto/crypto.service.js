"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
let CryptoService = class CryptoService {
    getConfirmationCode() {
        return crypto.randomUUID();
    }
    async getHash(password, userSalt) {
        const roundsNumber = 10;
        const salt = userSalt ?? (await (0, bcrypt_1.genSalt)(roundsNumber));
        const generatedHash = await (0, bcrypt_1.hash)(password, roundsNumber);
        return {
            salt,
            hash: generatedHash,
        };
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = __decorate([
    (0, common_1.Injectable)()
], CryptoService);
//# sourceMappingURL=crypto.service.js.map