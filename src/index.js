const Currencies = require('./collections/Currencies')
const Rates = require('./collections/Rates')
const Exchanges = require('./collections/Exchanges')
const fs = require('fs')
const iconv = require('iconv-lite')

class Index {

    constructor (cachePath) {
        this.cachePath = cachePath
    }

    /**
     * @returns {Promise<Index>}
     */
    async load () {
        await this.fetchFiles()
        const values = await Promise.all([
            this.loadDataFile(this.cachePath + '/info/bm_cy.dat'),
            this.loadDataFile(this.cachePath + '/info/bm_exch.dat'),
            this.loadDataFile(this.cachePath + '/info/bm_rates.dat')
        ])

        this.currencies = new Currencies(values[0])
        this.exchanges = new Exchanges(values[1])
        this.rates = new Rates(values[2])

        return this
    }

    /**
     * @returns {Rates}
     */
    getRates () {
        return this.rates
    }

    /**
     * @returns {Exchanges}
     */
    getExchanges () {
        return this.exchanges
    }

    /**
     * @returns {Currencies}
     */
    getCurrencies () {
        return this.currencies
    }

    /**
     * @param dataFile
     * @returns {Promise<any>}
     */
    loadDataFile(dataFile) {
        return new Promise((resolve, reject) => {
            fs.readFile(dataFile, null, (err, data) => {
                if (err) {
                    throw err;
                }

                resolve(iconv.encode(iconv.decode(data, 'windows-1251'), 'utf8').toString())
            })
        })
    }

    /**
     * @returns {Promise<void>}
     */
    async fetchFiles () {
        const decompress = require('decompress');

        await this.downloadZip()
        await decompress(this.cachePath + '/info.zip', this.cachePath + '/info')
    }

    /**
     * @returns {Promise<void>}
     */
    async downloadZip () {
        const request = require('request-promise')

        const r = await request.get('https://www.bestchange.ru/bm/info.zip', {
            encoding: null
        })

        fs.writeFileSync(this.cachePath + '/info.zip', r)
    }

}

module.exports = Index