import { Module } from '@nestjs/common';
import { GetControllerData } from './services/getControllerData.service';
import { getControllerDataController } from './getControllerData.controller';
import { ActiveControllerService } from './services/activeController.service';
import { AnswerPingService } from './services/answerPing.service';
import { CheckAccessService } from './services/checkAccess.service';
import { ConfirmActivationService } from './services/confirmActivation.service';
import { EventsHandleService } from './services/eventsHandle.service';
import { UnknownTypeService } from './services/unknownType.service';

@Module({
  controllers: [getControllerDataController],
  providers: [
    ActiveControllerService,
    AnswerPingService,
    CheckAccessService,
    ConfirmActivationService,
    GetControllerData,
    EventsHandleService,
    UnknownTypeService,
  ],
})
export class ConnectionModule {}
