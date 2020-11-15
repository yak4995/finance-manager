import SessionsManagementInputPort from './sessionsManagementInput.port';

export default interface PasswordlessSessionManagementInputPort
  extends SessionsManagementInputPort {
  sendOtp(email: string): Promise<string>;
}
