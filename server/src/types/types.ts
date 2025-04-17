export interface IControllerData {
  type: string;
  sn: number;
  messages: IPowerOn[] | ISetActive[];
}

interface IPowerOn {
  id: number;
  operation: string;
  fw: string;
  conn_fw: string;
  active: number;
  mode: number;
  controller_ip: string;
  reader_protocol: string;
}

interface ISetActive {
  id: number;
  success: number;
}

export interface ISetActiveResponse {
  id: number;
  operation: string;
  active: number;
  online: number;
}
