import { Controller, Get } from '@nestjs/common';
import { EmailsService } from './emails/emails.service';

const user = {
  email: 'teste@teste.com',
  name: 'user_1',
};

@Controller()
export class AppController {
  constructor(private emailsService: EmailsService) {}

  @Get('email')
  public async email() {
    this.emailsService.sendWelcomeEmail(user);

    return { ok: true };
  }
}
