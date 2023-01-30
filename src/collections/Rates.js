const Collection = require('./Collection')
const {parse} = require('csv-parse/sync')

class Rates extends Collection {

    /**
     * @param data
     */
    constructor (data) {
        super();

        this.data = parse(data, {
            delimiter: ';',
            onRecord: row => {
                const rateGive = parseFloat(row[3])
                const rateReceive = parseFloat(row[4])
                const minSum = parseFloat(row[8])
                const maxSum = parseFloat(row[9])

                if (rateGive && rateReceive) {
                    const from = parseInt(row[0])
                    const to = parseInt(row[1])
                    const exchangeId = parseInt(row[2])

                    return {
                        fromCurrencyId: from,
                        toCurrencyId: to,
                        exchangeId: exchangeId,
                        rateGive: rateGive,
                        rateReceive: rateReceive,
                        minSum,
                        maxSum,
                        reserve: row[5],
                        reviews: row[6]
                    }
                }

                return null
            }
        });

        this.data.sort((a, b) => (a[4] > b[4]) ? -1 : ((b[4] > a[4]) ? 1 : 0))
    }

    /**
     * @param fromCurrenciesId
     * @param toCurrenciesId
     * @returns {*[]}
     */
    filter (fromCurrenciesId, toCurrenciesId) {
        return this.data.filter((item) => item.fromCurrencyId === fromCurrenciesId && item.toCurrencyId === toCurrenciesId)
    }
}
module.exports = Rates
