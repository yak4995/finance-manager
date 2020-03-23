export default interface ConfigInterface {
  APP_PORT: number;
  DEBUG: string;
  DEFAULT_AUTH_STRATEGY: string;
  JWT_SECRET: string;
  JWT_TOKEN_EXPIRES_IN: number;
  PASSWORD_HASH_ROUNDS_COUNT: number;
  PRISMA_ENDPOINT: string;
  SSL_KEY_FILE_PATH: string;
  SSL_CERT_FILE_PATH: string;
  [other: string]: string | number;
}
