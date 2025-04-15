import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IControllerConnectionData } from 'src/types/types';
import { currentTime } from 'src/utils/currentTime';

@Injectable()
export class ConnectionService {
  async checkData(data: unknown): Promise<void> {
    await this.activeController(data as IControllerConnectionData);
  }

  async activeController(data: IControllerConnectionData): Promise<void> {
    console.log(`Data is IControllerConnectionData: `, data);

    const controllerIp = `http://${data.messages[0].controller_ip}`;
    const response = {
      date: currentTime(3),
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

    console.log('controllerIp: ', controllerIp);
    console.log('response: ', JSON.stringify(response));

    try {
      await axios.post(controllerIp, response);
    } catch (error) {
      console.error('Error send response to controller', error);
    }
  }
}
