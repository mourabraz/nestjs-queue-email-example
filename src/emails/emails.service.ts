import { Injectable, Logger } from '@nestjs/common';
import * as Bull from 'bull';

import { EmailConsumer } from '../queue/email.consumer';

@Injectable()
export class EmailsService {
  private logger = new Logger(EmailsService.name);

  async sendWelcomeEmail(user: { email: string; name: string }) {
    this.logger.verbose('sendWelcomeEmail: called');
    const queue = new Bull(EmailConsumer.channelName);
    queue.add({
      payload: {
        to: user.email,
        subject: 'Welcome',
        template: 'NewRegistration',
        context: {
          name: user.name || user.email,
        },
      },
    });
    //await queue.close();
  }
}
