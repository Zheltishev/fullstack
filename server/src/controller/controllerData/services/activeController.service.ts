import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { DtoPowerOn } from 'src/dto/cotrollerData.dto';
import { currentTime } from 'src/utils/currentTime';

@Injectable()
export class ActiveControllerService {
  activeController(message: DtoPowerOn, res: Response): void {
    console.log('execute activeController');

    const response = {
      date: currentTime(3),
      interval: 100,
      messages: [
        {
          id: message.id,
          operation: 'set_active',
          active: 1,
          online: 1,
        },
      ],
    };

    res.status(HttpStatus.OK).json(response);
  }
}
