const Collection = require('./Collection')

class Rates extends Collection {

    /**
     * @param data
     */
    constructor (data) {
        super(data)
        this.rows.forEach((row) => {
            const from = parseInt(row[0])
            const to = parseInt(row[1])
            const exchangeId = parseInt(row[2])
            const rateGive = parseFloat(row[3])
            const rateReceive = parseFloat(row[4])

            if (rateGive && rateReceive) {
                this.data.push({
                    fromCurrencyId: from,
                    toCurrencyId: to,
                    exchangeId: exchangeId,
                    rateGive: rateGive,
                    rateReceive: rateReceive,
                    reserve: row[5],
                    reviews: row[6]
                })
            }
        })

        this.data.sort((a,b) => (a.rateReceive > b.rateReceive) ? -1 : ((b.rateReceive > a.rateReceive) ? 1 : 0))
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
