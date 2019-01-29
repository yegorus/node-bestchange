# NODEJS bestchange.ru API

Api for bestchange.ru on nodejs.

## Install

```
$ npm i node-bestchange --save
```


## Usage

```js
async (() => {
    const Api = require('node-bestchange')
    const api = await (new Api('/cache')).load();
    
    // btc (93) to Tinkoff (105)
    const rates = await api.getRates().filter(93, 105)
    
    const currencies = await api.getCurrencies() // collection currencies
    console.log(currencies.getData()) // list currencies
})()

```

## Terms of use

To use the API, you need to add a link to https://bestchange.ru where currency rates will be used.


## Contribution

Pull requests are always welcome.
