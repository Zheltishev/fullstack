import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { IControllerData } from 'src/types/types';
import { currentTime } from 'src/utils/currentTime';

@Injectable()
export class ConnectionService {
  checkData(data: unknown, @Res() res: Response): void {
    this.activeController(data as IControllerData, res);
  }

  activeController(data: IControllerData, @Res() res: Response): void {
    console.log('messages ------------ ');
    console.log(data.messages);

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
  }
}
