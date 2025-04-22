import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import {
  DtoArrayEvents,
  DtoCheckAccess,
  DtoControllerData,
  DtoEvent,
  DtoPing,
  DtoPowerOn,
  DtoSetActive,
} from 'src/dto/cotrollerData.dto';
import { currentTime } from 'src/utils/currentTime';
import { ActiveControllerService } from './activeController.service';

@Injectable()
export class GetControllerData {
  constructor(
    private readonly ActiveControllerService: ActiveControllerService,
  ) {}
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

  private isCheckAccess(message: any): message is DtoCheckAccess {
    return (
      'id' in message &&
      'operation' in message &&
      'card' in message &&
      'reader' in message
    );
  }

  async checkData(
    data: DtoControllerData,
    @Res() res: Response,
  ): Promise<void> {
    console.log('messages ------------ ');
    console.log(data.messages);

    for (const message of data.messages) {
      if (this.isPowerOn(message)) {
        this.ActiveControllerService.execute(message, res);
      } else if (this.isArrayEvents(message)) {
        await this.eventsHandle(message, res);
      } else if (this.isSetActive(message)) {
        this.confirmActivation();
      } else if (this.isPing(message)) {
        this.answerPing(message, res);
      } else if (this.isCheckAccess(message)) {
        this.checkAccess();
      } else {
        this.unknownType();
      }
    }
  }

  async eventsHandle(
    message: DtoArrayEvents,
    @Res() res: Response,
  ): Promise<void> {
    console.log('execute eventsHandle');
    console.log(message.events);

    try {
      const eventPromises = message.events.map((event: DtoEvent) => ({
        flag: event.flag,
        event: event.event,
        time: new Date(event.time),
        card: event.card,
      }));

      await this.prisma.event.createMany({
        data: eventPromises,
      });

      console.log('All events saved successfully');

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
    } catch (error) {
      console.log('events execute error');

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
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

  checkAccess(): void {
    console.log('checkAccess');
  }

  // checkAccess(message: DtoCheckAccess, @Res() res: Response): void {
  //   const response = {
  //     date: currentTime(3),
  //     interval: 10,
  //     messages: [
  //       {
  //         id: message.id,
  //         operation: 'events',
  //         granted: 1,
  //       },
  //     ],
  //   };

  //   console.log('wrote events');

  //   res.status(HttpStatus.OK).json(response);
  // }

  confirmActivation(): void {
    console.log('confirmActivation');
  }

  unknownType(): void {
    console.log('unknown data type!');
  }
}
