import { Injectable } from '@nestjs/common';
import { IControllerConnectionData, ISetActiveResponse } from 'src/types/types';

@Injectable()
export class ConnectionService {
  checkData(data: unknown): void {
    this.activeController(data as IControllerConnectionData);
  }

  activeController(data: IControllerConnectionData): ISetActiveResponse {
    console.log(`Data is IControllerConnectionData: `, data);

    const controllerId = data.messages[0].id;

    console.log(`controller Id: `, controllerId);

    return {
      id: controllerId,
      operation: 'set_active',
      active: 1,
      online: 1,
    };
  }
}
