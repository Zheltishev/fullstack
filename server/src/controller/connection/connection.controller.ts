import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { Response } from 'express';
import { IControllerConnectionData, ISetActiveStatus } from 'src/types/types';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  private isControllerConnectionData(
    data: IControllerConnectionData | ISetActiveStatus,
  ): data is IControllerConnectionData {
    return 'specificFieldForControllerConnectionData' in data;
  }

  private isSetActiveStatus(
    data: IControllerConnectionData | ISetActiveStatus,
  ): data is ISetActiveStatus {
    return 'specificFieldForSetActiveStatus' in data;
  }

  @Post()
  logJson(
    @Body() data: IControllerConnectionData | ISetActiveStatus,
    @Res() res: Response,
  ): void {
    try {
      if (this.isControllerConnectionData(data)) {
        this.connectionService.logJson(data);
      } else if (this.isSetActiveStatus(data)) {
        console.log(data);
      }

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
