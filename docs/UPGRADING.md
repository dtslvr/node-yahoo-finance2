# Upgrading from yahoo-finance v1

**THIS DOCUMENT IS A WORK IN PROGRESS**

## historical()

The function signature has changed slightly, to remain consistent with the
rest of the library.

```js
// V1 took a single OPTIONS object as the only paramater
yahooFinanceV1.historical({ symbol, from, to });
[
  {
    date, open, high, low, close, adjClose, volume,
    symbol // was included
  },
  // ...
]

// V2 takes SYMBOL as 1st parameter, OPTIONS as 2nd.
yahooFinanceV2.historical(symbol, { period1 });
[
  {
    date, open, high, low, close, adjClose, volume,
    // symbol NOT included
  },
  // ...
]
```

**Query**

| Attribute     | v1                       | v2+                              |
| ------------- | ------------------------ | -------------------------------- |
| `symbol`      | As a `{ symbol }` option | First argument to historical()   |
| `fields`      | `{ from, to }`           | `{ period1, period2 }`.  Period2 defaults to now().
| dates         | "YYYY-MM-dd"             | JS Date object, or any format `new Date()` understands , so "YYYY-MM-dd" still works fine too.

**Results**

| Attribute     | v1                       | v2+                              |
| ------------- | ------------------------ | -------------------------------- |
| `symbol`      | Was included in each result | Not included in each result   |
