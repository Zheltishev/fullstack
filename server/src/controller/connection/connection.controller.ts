import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { Response } from 'express';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  checkData(@Body() data: unknown, @Res() res: Response): void {
    this.connectionService.checkData(data, res);
  }
}
