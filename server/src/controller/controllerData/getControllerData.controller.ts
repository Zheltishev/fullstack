import { Body, Controller, Post, Res } from '@nestjs/common';
import { GetControllerData } from './getControllerData.service';
import { Response } from 'express';
import { DtoControllerData } from 'src/dto/cotrollerData.dto';

@Controller('connection')
export class getControllerDataController {
  constructor(private readonly GetControllerData: GetControllerData) {}

  @Post()
  checkData(@Body() data: DtoControllerData, @Res() res: Response): void {
    this.GetControllerData.checkData(data, res);
  }
}
