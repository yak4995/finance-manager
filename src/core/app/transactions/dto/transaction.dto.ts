export default interface TransactionDto {
  datetime: Date;
  amount: number;
  transactionCategoryId: string;
  currencyId: string;
  description: string;
}
