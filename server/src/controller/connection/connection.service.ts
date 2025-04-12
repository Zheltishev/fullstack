import { Injectable } from '@nestjs/common';

@Injectable()
export class ConnectionService {
  logJson(data: any): void {
    console.log('JSON data', data);
  }
}
