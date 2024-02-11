import { Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class CryptoService {
  getConfirmationCode(): string {
    return crypto.randomUUID();
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
}
