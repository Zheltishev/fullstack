import { Injectable } from '@nestjs/common';
import { IControllerConnectionData, ISetActiveResponse } from 'src/types/types';

@Injectable()
export class ConnectionService {
  private isControllerConnectionData(
    data: unknown,
  ): data is IControllerConnectionData {
    return (
      typeof data === 'object' &&
      data !== null &&
      'type' in data &&
      'sn' in data &&
      'message' in data &&
      Array.isArray((data as IControllerConnectionData).message)
    );
  }

  checkData(data: unknown): void {
    console.log('Check data type: ', data);

    if (this.isControllerConnectionData(data)) {
      this.activeController(data);
    } else {
      console.error('Invalid data type!');
    }
  }

  activeController(data: IControllerConnectionData): ISetActiveResponse {
    console.log(`Data is IControllerConnectionData: `, data);

    return {
      id: 123456789,
      operation: 'set_active',
      active: 1,
      online: 1,
    };
  }
}
