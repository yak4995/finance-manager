export default interface ITransportService {
  broadcast(message: any): Promise<void>;
  groupcast(message: any, destination: string[]): Promise<void>;
  unicast(message: any, destination: string): Promise<void>;
}
