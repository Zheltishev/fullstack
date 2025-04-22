import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class DtoControllerData {
  @IsString()
  type: string;

  @IsNumber()
  sn: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  messages: (DtoPowerOn | DtoEvent | DtoSetActive | DtoPing | DtoCheckAccess)[];
}

export class DtoPowerOn {
  @IsNumber()
  id: number;

  @IsString()
  operation: string;

  @IsString()
  fw: string;

  @IsString()
  conn_fw: string;

  @IsNumber()
  active: number;

  @IsNumber()
  mode: number;

  @IsString()
  controller_ip: string;

  @IsString()
  reader_protocol: string;
}

export class DtoArrayEvents {
  @IsNumber()
  id: number;

  @IsString()
  operation: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DtoEvent)
  events: DtoEvent[];
}

export class DtoEvent {
  @IsNumber()
  event: number;

  @IsString()
  card: string;

  @IsString()
  time: string;

  @IsNumber()
  flag: number;
}

export class DtoPing {
  @IsNumber()
  id: number;

  @IsString()
  operation: string;

  @IsNumber()
  active: number;

  @IsNumber()
  mode: number;
}

export class DtoCheckAccess {
  @IsNumber()
  id: number;

  @IsString()
  operation: string;

  @IsNumber()
  card: string;

  @IsNumber()
  reader: number;
}

export class DtoSetActive {
  @IsNumber()
  id: number;

  @IsNumber()
  success: number;
}
