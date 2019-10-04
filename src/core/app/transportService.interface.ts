export default interface ITransportService {
  broadcast(message: any): Promise<boolean>;
  groupcast(message: any, destination: string[]): Promise<boolean>;
  unicast(message: any, destination: string): Promise<boolean>;
}
