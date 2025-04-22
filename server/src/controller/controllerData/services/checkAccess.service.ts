import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckAccessService {
  checkAccess(): void {
    console.log('confirmActivation');
  }
}

// checkAccess(message: DtoCheckAccess, @Res() res: Response): void {
//   const response = {
//     date: currentTime(3),
//     interval: 10,
//     messages: [
//       {
//         id: message.id,
//         operation: 'events',
//         granted: 1,
//       },
//     ],
//   };

//   console.log('wrote events');

//   res.status(HttpStatus.OK).json(response);
// }
