import { Injectable } from '@nestjs/common';
import { IControllerConnectionData, ISetActiveResponse } from 'src/types/types';

@Injectable()
export class ConnectionService {
  private isControllerConnectionData(
    data: any,
  ): data is IControllerConnectionData {
    return (
      typeof data === 'object' &&
      data !== null &&
      'id' in data &&
      'operation' in data &&
      'active' in data &&
      'online' in data
    );
  }

  checkData(data: unknown): void {
    console.log('Check data type: ', data);

    // Проверяем, является ли data типом IControllerConnectionData
    if (this.isControllerConnectionData(data)) {
      // Если проверка прошла, вызываем activeController
      const result = this.activeController(data);
      console.log('Result from activeController: ', result);
    } else {
      console.log('Data is not of type IControllerConnectionData');
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
