import { Module } from '@nestjs/common';
import { GetControllerData } from './services/getControllerData.service';
import { getControllerDataController } from './getControllerData.controller';
import { ActiveControllerService } from './services/activeController.service';

@Module({
  controllers: [getControllerDataController],
  providers: [GetControllerData, ActiveControllerService],
})
export class ConnectionModule {}
