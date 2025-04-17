import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './controller/controllerData/getControllerData.module';

@Module({
  imports: [ConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
