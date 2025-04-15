import { HttpStatus, Injectable } from '@nestjs/common';
// import axios from 'axios';
import { Response } from 'express';
import { IControllerConnectionData } from 'src/types/types';
import { currentTime } from 'src/utils/currentTime';

@Injectable()
export class ConnectionService {
  checkData(data: unknown, res: Response): void {
    this.activeController(data as IControllerConnectionData, res);
  }

  activeController(data: IControllerConnectionData, res: Response): void {
    console.log(`Data is IControllerConnectionData: `, data);

    // const controllerIp = `http://${data.messages[0].controller_ip}`;
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

    res.status(HttpStatus.OK).json(response);

    // try {
    //   await axios.post(controllerIp, response);
    // } catch (error) {
    //   console.error('Error send response to controller', error);
    // }
  }
}
