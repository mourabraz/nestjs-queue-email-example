import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class EmailConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('email.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('email.port'));
  }

  get user(): string {
    return this.configService.get<string>('email.user');
  }

  get pass(): string {
    return this.configService.get<string>('email.pass');
  }

  get from(): string {
    return this.configService.get<string>('email.from');
  }
}
