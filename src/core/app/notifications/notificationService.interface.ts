// use transport service from infrastructure:
// email, sms, slack, etc.
export default interface INotificationService {
  broadcast(message: any): Promise<boolean>;
  groupcast(message: any, destination: string[]): Promise<boolean>;
  anycast(message: any, destination: string[]): Promise<boolean>;
  unicast(message: any, destination: string): Promise<boolean>;
}
