interface IControllerConnectionMessage {
  id: number;
  operation: string;
  fw: string;
  conn_fw: string;
  active: number;
  mode: number;
  controller_ip: string;
  reader_protocol: string;
}

export interface IControllerConnectionData {
  type: string;
  sn: number;
  message: IControllerConnectionMessage[];
}
