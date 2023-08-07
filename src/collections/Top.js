const Collection = require('./Collection')
const {parse} = require('csv-parse/sync')

class Top extends Collection {

    /**
     * @param data
     */
    constructor(data) {
        super();
        for (const row of parse(this.convertUtf8(data), {delimiter: ';'})) {
            this.data.push({
                fromCurrencyId: +row[0],
                toCurrencyId: +row[1],
				unknownField: row[2]
            })
        }
    }
}
module.exports = Top
