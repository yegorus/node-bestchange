const iconv = require("iconv-lite");

/**
 * Abstract class Collection
 */
class Collection {
    constructor () {
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

    /**
     * @param buf
     * @returns {Buffer}
     */
    convertUtf8(buf) {
        return iconv.encode(iconv.decode(buf, 'windows-1251'), 'utf8')
    }
}

module.exports = Collection
