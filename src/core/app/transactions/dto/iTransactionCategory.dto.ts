export default interface ITransactionCategoryDto {
  name: string;
  parentCategoryId?: string;
  isOutcome: boolean;
}
