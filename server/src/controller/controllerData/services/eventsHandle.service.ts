import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { DtoArrayEvents, DtoEvent } from 'src/dto/cotrollerData.dto';
import { currentTime } from 'src/utils/currentTime';

@Injectable()
export class EventsHandleService {
  private prisma = new PrismaClient();

  async checkEvent(message: DtoArrayEvents, res: Response): Promise<void> {
    console.log('execute eventsHandle');
    console.log(message.events);

    try {
      const recordedEvents = message.events.map((event: DtoEvent) => ({
        flag: event.flag,
        event: event.event,
        time: event.time,
        card: event.card,
      }));

      console.log('Preparing to save events:', recordedEvents);

      await this.prisma.event.createMany({
        data: recordedEvents,
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
      console.error('Error while processing events:', error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
