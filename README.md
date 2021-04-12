# Currency transformation util

### Installation

```bash
yarn add currency-transformation
```

### How to usage

```typescript
import { CurrencyTransformation, CurrencyList } from 'currency-transformation';

const currencyTransformation = new CurrencyTransformation();

const amount = currencyTransformation.convert({
  amount: 100,
  from: CurrencyList.USD,
  to: CurrencyList.UAH,
  baseCurrency: CurrencyList.UAH, // should be 1 as value in rates list
  moneyFormat: true,
  crossFormat: false,
  rates: {
    EUR: 29.67359,
    GBP: 33.4715,
    RUB: 0.37,
    USD: 27.17391,
    UAH: 1
  }
});

console.log(amount);
```
