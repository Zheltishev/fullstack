import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { Response } from 'express';
import { IControllerConnectionData } from 'src/types/types';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  logJson(@Body() data: IControllerConnectionData, @Res() res: Response): void {
    try {
      this.connectionService.logJson(data);

      res
        .status(HttpStatus.OK)
        .send({ message: 'Request successfully processed' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'An error occurred',
        error:
          error instanceof Error
            ? error.message
            : 'Error controller connection',
      });
    }
  }
}
