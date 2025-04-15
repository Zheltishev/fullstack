import { Body, Controller, Post } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  checkData(@Body() data: unknown): void {
    this.connectionService.checkData(data);
  }
}
