import { Injectable } from '@nestjs/common';
import { IControllerConnectionData } from 'src/types/types';

@Injectable()
export class ConnectionService {
  logJson(data: IControllerConnectionData): void {
    console.log('JSON data', data);

    const controllerIp = data.message[0].controller_ip;

    console.log('controllerIp: ', controllerIp);
  }
}
