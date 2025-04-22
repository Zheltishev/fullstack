import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
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
  prisma = new PrismaClient();

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

    for (const message of data.messages) {
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
    }
  }

  activeController(message: DtoPowerOn, @Res() res: Response): void {
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

  eventsHandle(message: DtoArrayEvents, @Res() res: Response): void {
    console.log('execute eventsHandle');
    console.log(message.events);

    try {
      // const eventPromises = message.events.map(async (event: DtoEvent) => {
      //   const recordedEvent = {
      //     flag: event.flag,
      //     event: event.event,
      //     time: event.time,
      //     card: event.card,
      //   };

      //   await this.prisma.event.create({
      //     data: recordedEvent,
      //   });
      // });

      // await Promise.all(eventPromises);

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

      console.log('wrote events');

      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('events execute error');

      if (error instanceof Error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'An error occurred',
          error: error.message,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'An unknown error occurred',
          error: String(error),
        });
      }
    }
  }

  answerPing(message: DtoPing, @Res() res: Response): void {
    console.log('answer ping');

    const response = {
      date: currentTime(3),
      interval: 100,
      messages: [],
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
