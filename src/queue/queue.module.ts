import { resolve } from 'path';

import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nestjs-modules/mailer';

import { EmailConfigModule } from '../config/email/config.module';
import { EmailConfigService } from '../config/email/config.service';

import { EmailConsumer } from './email.consumer';
import { EventGateway } from './event.gateway';
import { RedisReusableConnection } from './redis-reusable-connection';
import { RedisIoAdapter } from './redis-io-adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [EmailConfigModule],
      useFactory: async (configServide: EmailConfigService) => ({
        transport: {
          host: configServide.host,
          port: configServide.port,
          secure: false,
          auth: {
            user: configServide.user,
            pass: configServide.pass,
          },
        },
        defaults: {
          from: configServide.from,
        },
        template: {
          dir: resolve(__dirname, '..', 'views', 'emails'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: resolve(__dirname, '..', 'views', 'emails', 'partials'),
            options: {
              strict: true,
            },
          },
        },
      }),
      inject: [EmailConfigService],
    }),
  ],
  providers: [RedisReusableConnection, EmailConsumer, EventGateway],
})
class QueueModule {}

async function bootstrap() {
  const app = await NestFactory.create(QueueModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.init();
}

bootstrap();
