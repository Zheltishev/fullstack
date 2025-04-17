import { Module } from '@nestjs/common';
import { GetControllerData } from './getControllerData.service';
import { getControllerDataController } from './getControllerData.controller';

@Module({
  controllers: [getControllerDataController],
  providers: [GetControllerData],
})
export class ConnectionModule {}
