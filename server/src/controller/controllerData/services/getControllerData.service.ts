import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  DtoArrayEvents,
  DtoCheckAccess,
  DtoControllerData,
  DtoPing,
  DtoPowerOn,
  DtoSetActive,
} from 'src/dto/cotrollerData.dto';
import { ActiveControllerService } from './activeController.service';
import { EventsHandleService } from './eventsHandle.service';
import { AnswerPingService } from './answerPing.service';
import { ConfirmActivationService } from './confirmActivation.service';
import { CheckAccessService } from './checkAccess.service';
import { UnknownTypeService } from './unknownType.service';

@Injectable()
export class GetControllerData {
  constructor(
    private readonly ActiveControllerService: ActiveControllerService,
    private readonly EventsHandleService: EventsHandleService,
    private readonly AnswerPingService: AnswerPingService,
    private readonly ConfirmActivationService: ConfirmActivationService,
    private readonly CheckAccessService: CheckAccessService,
    private readonly UnknownTypeService: UnknownTypeService,
  ) {}

  private isPowerOn(message: any): message is DtoPowerOn {
    return (
      'operation' in message &&
      'fw' in message &&
      'conn_fw' in message &&
      'controller_ip' in message &&
      'reader_protocol' in message
    );
  }

  private isArrayEvents(message: any): message is DtoArrayEvents {
    return 'id' in message && 'operation' in message && 'events' in message;
  }

  private isSetActive(message: any): message is DtoSetActive {
    return 'id' in message && 'success' in message;
  }

  private isPing(message: any): message is DtoPing {
    return (
      'id' in message &&
      'operation' in message &&
      'active' in message &&
      'mode' in message
    );
  }

  private isCheckAccess(message: any): message is DtoCheckAccess {
    return (
      'id' in message &&
      'operation' in message &&
      'card' in message &&
      'reader' in message
    );
  }

  async checkData(
    data: DtoControllerData,
    @Res() res: Response,
  ): Promise<void> {
    console.log('messages ------------ ');
    console.log(data.messages);

    for (const message of data.messages) {
      if (this.isPowerOn(message)) {
        this.ActiveControllerService.activeController(message, res);
      } else if (this.isArrayEvents(message)) {
        await this.EventsHandleService.checkEvent(message, res);
      } else if (this.isSetActive(message)) {
        this.ConfirmActivationService.confirmActivation();
      } else if (this.isPing(message)) {
        this.AnswerPingService.answerPing(message, res);
      } else if (this.isCheckAccess(message)) {
        this.CheckAccessService.checkAccess();
      } else {
        this.UnknownTypeService.unknownType();
      }
    }
  }
}
