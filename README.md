# Currency transformation util

### How to usage

```typescript
import { CurrencyTransformation, CurrencyList } from 'currency-transformer';

const currencyTransformation = new CurrencyTransformation();

const amount = currencyTransformation.convert({
  amount: 100,
  from: CurrencyList.USD,
  to: CurrencyList.UAH,
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