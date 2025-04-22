import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { DtoPing } from 'src/dto/cotrollerData.dto';
import { currentTime } from 'src/utils/currentTime';
import { Response } from 'express';

@Injectable()
export class AnswerPingService {
  answerPing(message: DtoPing, @Res() res: Response): void {
    console.log('Answering ping...');
    console.log(message);

    const response = {
      date: currentTime(3),
      interval: 10,
      messages: [
        {
          id: message.id,
          operation: 'ping',
          active: message.active,
          mode: message.mode,
        },
      ],
    };

    res.status(HttpStatus.OK).json(response);
  }
}
