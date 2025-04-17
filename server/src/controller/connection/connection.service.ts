import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  DtoArrayEvents,
  DtoControllerConnection,
  DtoPowerOn,
} from 'src/dto/cotrollerData.dto';
import { currentTime } from 'src/utils/currentTime';

@Injectable()
export class ConnectionService {
  private isPowerOn(message: any): message is DtoPowerOn {
    return (
      'operation' in message &&
      'fw' in message &&
      'conn_fw' in message &&
      'controller_ip' in message &&
      'reader_protocol' in message
    );
  }

  private isArrayEvents(message: any): message is DtoArrayEvents {
    return 'id' in message && 'operation' in message && 'events' in message;
  }

  checkData(data: DtoControllerConnection, @Res() res: Response): void {
    console.log('messages ------------ ');
    console.log(data.messages);

    data.messages.forEach((message) => {
      if (this.isPowerOn(message)) {
        this.activeController(message, res);
      }

      if (this.isArrayEvents(message)) {
        this.eventsHandle(message, res);
      }
    });
  }

  activeController(message: DtoPowerOn, @Res() res: Response): void {
    console.log('execute activeController');

    const response = {
      date: currentTime(3),
      interval: 10,
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

  eventsHandle(message: DtoArrayEvents, @Res() res: Response): void {
    console.log('execute eventsHandle');
    console.log(message.events);

    const response = {
      id: message.id,
      operation: 'events',
      events_success: message.events.length,
    };

    res.status(HttpStatus.OK).json(response);
  }
}
