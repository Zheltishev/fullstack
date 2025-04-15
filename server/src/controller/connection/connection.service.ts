import { Injectable } from '@nestjs/common';
import { IControllerConnectionData, ISetActiveResponse } from 'src/types/types';

@Injectable()
export class ConnectionService {
  checkData(data: unknown): void {
    console.log('Check data type: ', data);

    if (
      typeof data === 'object' &&
      data !== null &&
      'type' in data &&
      typeof (data as IControllerConnectionData).type === 'string' &&
      'sn' in data &&
      typeof (data as IControllerConnectionData).sn === 'number' &&
      'message' in data &&
      Array.isArray((data as IControllerConnectionData).message)
    ) {
      const message = (data as IControllerConnectionData).message;

      const isValidMessage = message.every(
        (msg) =>
          typeof msg.id === 'number' &&
          typeof msg.operation === 'string' &&
          typeof msg.fw === 'string' &&
          typeof msg.conn_fw === 'string' &&
          typeof msg.active === 'number' &&
          typeof msg.mode === 'number' &&
          typeof msg.controller_ip === 'string' &&
          typeof msg.reader_protocol === 'string',
      );

      if (isValidMessage) {
        this.activeController(data as IControllerConnectionData);
      } else {
        console.error('Invalid message structure!');
      }
    } else {
      console.error('Data does not match IControllerConnectionData.');
    }
  }

  activeController(data: IControllerConnectionData): ISetActiveResponse {
    console.log(`Data is IControllerConnectionData: `, data);

    return {
      id: data.message[0].id,
      operation: 'set_active',
      active: 1,
      online: 1,
    };
  }
}
