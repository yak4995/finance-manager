export default interface ConfigInterface {
  APP_PORT: number;
  DEFAULT_AUTH_STRATEGY: string;
  JWT_SECRET: string;
  JWT_TOKEN_EXPIRES_IN: string;
  PRISMA_ENDPOINT: string;
  [other: string]: string | number;
}
