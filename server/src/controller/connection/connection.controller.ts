import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { Response } from 'express';
import { DtoControllerConnection } from 'src/dto/cotrollerData.dto';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  checkData(@Body() data: DtoControllerConnection, @Res() res: Response): void {
    this.connectionService.checkData(data, res);
  }
}
