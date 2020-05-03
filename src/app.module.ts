import { Module } from '@nestjs/common';

import { EventGateway } from './queue/event.gateway';
import { AppController } from './app.controller';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [EmailsModule],
  controllers: [AppController],
  providers: [EventGateway],
})
export class AppModule {}
