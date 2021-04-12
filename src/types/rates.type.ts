import { CurrencyList } from '../enum/currency.enum';

/**
 * Rates type for currency
 */
export type Rates = {
  /**
   * Abstract rates type
   */
  [key in CurrencyList]?: number;
};
