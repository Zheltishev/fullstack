import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  DtoArrayEvents,
  DtoControllerData,
  DtoPing,
  DtoPowerOn,
  DtoSetActive,
} from 'src/dto/cotrollerData.dto';
import { currentTime } from 'src/utils/currentTime';

@Injectable()
export class GetControllerData {
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

  private isSetActive(message: any): message is DtoSetActive {
    return 'id' in message && 'success' in message;
  }

  private isPing(message: any): message is DtoPing {
    return (
      'id' in message &&
      'operation' in message &&
      'active' in message &&
      'mode' in message
    );
  }

  checkData(data: DtoControllerData, @Res() res: Response): void {
    console.log('messages ------------ ');
    console.log(data.messages);

    data.messages.forEach((message) => {
      if (this.isPowerOn(message)) {
        this.activeController(message, res);
      } else if (this.isArrayEvents(message)) {
        this.eventsHandle(message, res);
      } else if (this.isSetActive(message)) {
        this.confirmActivation();
      } else if (this.isPing(message)) {
        this.answerPing(message, res);
      } else {
        this.unknownType();
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
      date: currentTime(3),
      interval: 10,
      messages: [
        {
          id: message.id,
          operation: 'events',
          events_success: message.events.length,
        },
      ],
    };

    res.status(HttpStatus.OK).json(response);
  }

  answerPing(message: DtoPing, @Res() res: Response): void {
    console.log('answer ping');

    const response = {
      date: currentTime(3),
      interval: 10,
      messages: [
        {
          id: message.id,
          success: 1,
        },
      ],
    };

    res.status(HttpStatus.OK).json(response);
  }

  confirmActivation(): void {
    console.log('confirmActivation');
  }

  unknownType(): void {
    console.log('unknown data type!');
  }
}
