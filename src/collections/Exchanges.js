const Collection = require('./Collection')

class Exchanges extends Collection {

    /**
     * @param data
     */
    constructor (data) {
        super(data)
        this.rows.forEach((row) => {
            this.data[row[0]] = {
                id: row[0],
                name: row[1]
            }
        })
    }
}
module.exports = Exchanges