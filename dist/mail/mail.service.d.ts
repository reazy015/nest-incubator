import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly configService;
    constructor(configService: ConfigService);
    sendConfimationEmail(email: string, confirmationCode: string): Promise<boolean>;
}
