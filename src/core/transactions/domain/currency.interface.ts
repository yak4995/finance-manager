export interface ICurrency {
  getName(): string;
  getCode(): string;
  setName(name: string): this;
  setCode(code: string): this;
}
