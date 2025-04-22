import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfirmActivationService {
  confirmActivation(): void {
    console.log('confirmActivation');
  }
}
