/**
 * Internal module file of 'cmdlib'.
 */


const Command = require("../command");


class CMDLib {

    /**
     * Creates an instance of CMDLib.
     * @param {object} [items] Key, value mapping
     * @memberof CMDLib
     */
    constructor(items=null) {
        /** @type {{[key: string]: Command}} */
        this.__items = {};
        if (null != items)
            this.__items = {};
    }


    /**
     * Adds a Command to this CmdLib with the given key.
     * @param {string} key Key.
     * @param {Command} item Command to add.
     * @memberof CMDLib
     */
    add(key, item) {
        if (typeof item !== 'object')
            throw new TypeError('Parameter not a valid Command!');
        else if (typeof key !== 'string')
            throw new TypeError('Invalid Command alias!');
        else this.__items[key] = item;
    }


    /**
     * Remove the Command having the given key.
     * @param {string} key Key.
     * @memberof CMDLib
     */
    remove(key) {
        delete this.__items[key];
    }


    /**
     * Returns the Command indexed with the given key.
     * @param {string} key Key.
     * @return {Command} Command
     * @memberof CMDLib
     */
    getItem(key) {
        return (this.__items[key]) ? this.__items[key] : null;
    }
}


module.exports = CMDLib;

