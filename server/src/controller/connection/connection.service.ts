import { Injectable } from '@nestjs/common';
import { IControllerConnectionData, ISetActiveResponse } from 'src/types/types';

@Injectable()
export class ConnectionService {
  logJson(data: IControllerConnectionData): ISetActiveResponse {
    const controllerIp = data.message[0].controller_ip;

    console.log('controllerIp: ', controllerIp);

    return {
      id: 123456789,
      operation: 'set_active',
      active: 1,
      online: 1,
    };
  }
}
