/**
 * Abstract class Collection
 */
class Collection {

    /**
     * @param data
     */
    constructor (data) {

        this.rows = data.split("\n").map((item) => item.split(';'))
        this.data = []
    }

    /**
     * @param id
     * @returns {boolean}
     */
    get (id) {
        return this.data[id] ? this.data[id] : false
    }

    /**
     * @returns {Array}
     */
    getData () {
        return this.data
    }
}

module.exports = Collection