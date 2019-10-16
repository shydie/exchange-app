const API = 'https://api.exchangeratesapi.io/latest';

const defaultTodayRatesOrder = [
  'ILS',
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'MXN',
  'JPY'
];

function mapRatesByCurrency(rates, currencies) {
  return currencies.map((curr) => {
    return {
      name: curr,
      value: rates[curr] || 0
    };
  });
}

export default function createStore() {
  return {
    todayRates: null,
    currencies: [],
    exchangeParams: {
      from: 'USD',
      to: 'ILS',
      amount: 1000.00,
      rate: 1,
      lastUpdate: ''
    },

    get sortedTodayRates() {
      if (!this.todayRates) {
        return null;
      }

      const { from, to } = this.exchangeParams;

      let rates = mapRatesByCurrency(this.todayRates, defaultTodayRatesOrder);

      if (![from, to].includes('ILS')) {
        rates.pop();
      } else {
        rates = rates.filter(rate => rate.name !== 'ILS');
      }

      const includedIndex = rates.findIndex(rate => [from, to].includes(rate.name) && rate.name !== 'USD');
      const USDIndex = rates.findIndex(rate => rate.name === 'USD');

      if (includedIndex !== -1) {
        rates.splice(includedIndex - 1, 1, rates.splice(USDIndex, 1)[0]);
      } else {
        rates.splice(USDIndex, 1);
      }

      return rates;
    },

    get exchangeValue() {
      const { rate, amount } = this.exchangeParams;
      return (rate * amount).toFixed(2);
    },

    getTodayRates() {
      const { from } = this.exchangeParams;
      fetch(`${API}?base=${from}&symbols=${defaultTodayRatesOrder}`)
        .then(res => res.json())
        .then(json => {
          if(json) {
            this.setTodayRates(json.rates);
          }
        });
    },

    getExchangeRate() {
      const { from, to } = this.exchangeParams;
      fetch(`${API}?base=${from}&symbols=${to}`)
        .then(res => res.json())
        .then(json => {
          if(json) {
            const rate = Object.values(json.rates)[0];
            this.setExchangeRate(rate);
            this.setExchangeLastUpdate(json.date);
          }
        });
    },

    getCurrencies() {
      fetch(`${API}`)
        .then(res => res.json())
        .then(json => {
          if(json) {
            this.setCurrencies(Object.keys(json.rates));
          }
        });
    },

    setTodayRates(rates) {
      this.todayRates = rates;
    },

    setCurrencies(currencies) {
      this.currencies = currencies;
    },

    setExchangeFrom(value) {
      this.exchangeParams.from = value;
    },

    setExchangeTo(value) {
      this.exchangeParams.to = value;
    },

    setExchangeAmount(value) {
      this.exchangeParams.amount = value;
    },

    setExchangeRate(rate) {
      this.exchangeParams.rate = rate;
    },

    setExchangeLastUpdate(date) {
      this.exchangeParams.lastUpdate = date;
    },
  };
}