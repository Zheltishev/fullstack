import { Injectable } from '@nestjs/common';

@Injectable()
export class UnknownTypeService {
  unknownType(): void {
    console.log('confirmActivation');
  }
}
