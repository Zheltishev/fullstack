import { Injectable } from '@nestjs/common';
import { IControllerConnectionData, ISetActiveResponse } from 'src/types/types';

@Injectable()
export class ConnectionService {
  checkData(data: unknown): void {
    console.log('Check data type: ', data);

    this.activeController(data as IControllerConnectionData);
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
