export default interface ITransactionDto {
  datetime: Date;
  amount: number;
  transactionCategoryId: string;
  currencyId: string;
  description: string;
}
