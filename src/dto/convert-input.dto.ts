import { Rates } from '../types/rates.type';
import { CurrencyList } from '../enum/currency.enum';

/**
 * Input DTO for conversion
 */
export class ConvertInputDto {
  /**
   * Money amount
   */
  public amount: number;

  /**
   * From currency
   */
  public from: CurrencyList;

  /**
   * To currency
   */
  public to: CurrencyList;

  /**
   * Rates list
   */
  public rates: Rates;

  /**
   * Base currency
   */
  public baseCurrency: CurrencyList;

  /**
   * One or two digits after comma
   */
  public moneyFormat?: boolean;

  /**
   * Better exchange rate
   */
  public crossFormat?: boolean;
}
