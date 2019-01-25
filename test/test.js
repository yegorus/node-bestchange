const Api = require('../')
const expect = require('expect.js')
const simple = require('simple-mock')
const api = new Api(__dirname + '/data')
simple.mock(api, 'downloadZip').callFn(() => {})

it('Test types and empty', async () => {
    await api.load()

    expect(api.getCurrencies()).to.be.an(require('../src/collections/Currencies'))
    expect(api.getCurrencies().getData()).to.be.an('array')
    expect(api.getCurrencies().getData()).to.not.empty()

    expect(api.getRates()).to.be.an(require('../src/collections/Rates'))
    expect(api.getRates().getData()).to.be.an('array')
    expect(api.getRates().getData()).to.not.empty()

    expect(api.getExchanges()).to.be.an(require('../src/collections/Exchanges'))
    expect(api.getExchanges().getData()).to.be.an('array')
    expect(api.getExchanges().getData()).to.not.empty()

})

it('Rates test', async () => {
    await api.load()

    expect(api.getRates().filter(93, 105)).to.eql(api.getRates().getData().filter((item) => {
        return item.fromCurrencyId === 93 && item.toCurrencyId === 105
    }))

    expect(api.getRates().filter(93, 105)[0]).to.have.keys(
        'fromCurrencyId',
        'toCurrencyId',
        'exchangeId',
        'rateGive',
        'rateReceive',
        'reserve',
        'reviews'
    )
})


it('Collections test', async () => {
    await api.load()

    expect(api.getExchanges().get(1).name).to.eql('SuperChange')
    expect(api.getExchanges().get(1).id).to.eql(1)
    expect(api.getExchanges().get(-1)).to.be.eql(false)


    expect(api.getCurrencies().get(105).id).to.eql(105)
    expect(api.getCurrencies().get(105).name).to.eql('Тинькофф')
    expect(api.getCurrencies().get(-1)).to.be.eql(false)
})


