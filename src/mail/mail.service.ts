import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}
  async sendConfimationEmail(
    email: string,
    confirmationCode: string,
  ): Promise<boolean> {
    const transport = createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });

    try {
      await transport.sendMail({
        from: `"It-kamasutra 👻" <${this.configService.get('EMAIL_USER')}>`,
        to: email,
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: `<h1>Thank for your registration</h1>
            <p>To finish registration please follow the link below:
                <a href='https://somesite.com/confirm-email?code=${confirmationCode}'>complete registration</a>
            </p>`,
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
