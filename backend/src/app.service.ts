import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  nestWorks(): string {
    return 'nestjs works!';
  }
}
