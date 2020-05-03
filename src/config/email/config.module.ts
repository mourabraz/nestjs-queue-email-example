import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import { EmailConfigService } from './config.service';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MAIL_HOST: Joi.string().default('smtp.mailtrap.io'),
        MAIL_PORT: Joi.number().default(2525),
        MAIL_USER: Joi.string().default(''),
        MAIL_PASS: Joi.string().default(''),
        MAIL_FROM: Joi.string().default('"nest-modules" <modules@nestjs.com>'),
      }),
    }),
  ],
  providers: [ConfigService, EmailConfigService],
  exports: [ConfigService, EmailConfigService],
})
export class EmailConfigModule {}
