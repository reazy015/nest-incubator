import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class CryptoService {
  getConfirmationCode(): string {
    return randomUUID();
  }

  async getHash(
    password: string,
    userSalt?: string,
  ): Promise<{ salt: string; hash: string }> {
    const roundsNumber = 10;
    const salt = userSalt ?? (await genSalt(roundsNumber));

    const generatedHash = await hash(password, roundsNumber);

    return {
      salt,
      hash: generatedHash,
    };
  }

  async validatePasswordHash(password: string, hash: string): Promise<boolean> {
    const isValid = await compare(password, hash);

    return isValid;
  }
}
