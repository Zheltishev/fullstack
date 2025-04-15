/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IControllerConnectionData } from 'src/types/types';

@Injectable()
export class ConnectionService {
  checkData(data: unknown): void {
    this.activeController(data as IControllerConnectionData);
  }

  activeController(data: IControllerConnectionData): any {
    console.log(`Data is IControllerConnectionData: `, data);

    const response = {
      date: '2024-07-25 10:20:30',
      interval: 10,
      messages: [
        {
          id: data.messages[0].id,
          operation: 'set_active',
          active: 1,
          online: 1,
        },
      ],
    };

    console.log(JSON.stringify(response));

    return JSON.stringify(response);
  }
}
