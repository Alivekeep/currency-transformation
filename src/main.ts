import { BigNumber } from 'bignumber.js';

import { CurrencyList } from './enum/currency.enum';
import { baseCurrency } from './const/common.const';
import { ConvertInputDto } from './dto/convert-input.dto';
import { Rates } from './types/rates.type';

export class CurrencyTransformation {
  /**
   * Base currency, need for conversion
   */
  private readonly baseCurrency: CurrencyList;

  constructor() {
    this.baseCurrency = baseCurrency;
  }

  /**
   * Conversion method. Possible direct convert or through all currencies
   * @param input - input data
   */
  public convert(input: ConvertInputDto): number {
    const currencyFrom: CurrencyList = input.from;
    const currencyTo: CurrencyList = input.to;

    const amount = new BigNumber(input.amount);

    if (!input.rates[currencyTo] || !input.rates[currencyFrom] || !input.rates[this.baseCurrency]) {
      throw new Error('Rates must be include From and To currencies');
    }

    if (!input.crossFormat) {
      const moneyValue = amount.multipliedBy(this.getRate(currencyFrom, currencyTo, input.rates));
      if (input.moneyFormat) {
        if (moneyValue.isGreaterThan(0.01)) {
          return Number(moneyValue.toFixed(2));
        } else {
          return Number(moneyValue.toFixed(4));
        }
      }

      return Number(moneyValue.toFixed());
    } else {
      let betterRateBigNumber: BigNumber = new BigNumber(0);

      /**
       * For example: USD -> EUR -> UAH
       */
      for (const currencyKey in input.rates) {
        if (input.rates.hasOwnProperty(currencyKey)) {
          const currency: CurrencyList = currencyKey as CurrencyList;

          const inputExchange = amount.multipliedBy(this.getRate(currencyFrom, currency, input.rates));
          const middleExchange = inputExchange.multipliedBy(this.getRate(currency, currencyTo, input.rates));

          if (betterRateBigNumber.isZero() || middleExchange.isLessThan(betterRateBigNumber)) {
            betterRateBigNumber = middleExchange;
          }
        }
      }

      if (input.moneyFormat) {
        if (betterRateBigNumber.isGreaterThan(0.01)) {
          return Number(betterRateBigNumber.toFixed(2));
        } else {
          return Number(betterRateBigNumber.toFixed(4));
        }
      }

      return Number(betterRateBigNumber.toFixed());
    }
  }

  /**
   * Internal method for calculating rates
   * @param from Currency
   * @param to Currency
   * @param rates List of rates
   */
  protected getRate(from: CurrencyList, to: CurrencyList, rates: Rates): BigNumber {
    if (to === this.baseCurrency) {
      return new BigNumber(Number(rates[from]));
    }

    if (from === this.baseCurrency) {
      return new BigNumber(1).dividedBy(new BigNumber(Number(rates[to])));
    }

    return new BigNumber(Number(rates[from])).multipliedBy(
      new BigNumber(1).dividedBy(new BigNumber(Number(rates[to])))
    );
  }
}
