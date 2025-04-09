import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverStarted(): string {
    return 'nestjs has been started';
  }
}
