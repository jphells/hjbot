/**
 * Internal module file of 'util'.
 */


const Assert = require('assert');


/**
 * Test whether all given functions throw the given exception.
 * @param {Error} exc Exception whose instance should be thrown.
 * @param {...any} funcs Functions that should throw an instance.
 * @returns {Promise<void>} Promise
 */
async function allThrow(exc, ...funcs) {
    var count = 0;
    for (const func of funcs) {
        try { await func(); }
        catch (err) {
            //@ts-ignore
            Assert.strictEqual(err instanceof exc, true);
            count++;
        }
    } 
    //@ts-ignore
    Assert.strictEqual(count, funcs.length);
}


/**
 * Returns an object containing current date and timestamp as string values.
 * This is mainly used in the logging features of the application.
 * @returns {{date: string, time: string}} An object containing current date
 * and timestamp as string values.
 */
function getDateTimeStr() {
    var dt = new Date();
    return {
        'date': `${(dt.getMonth() + 1)}.${dt.getDate()}.${dt.getFullYear()}`
            .split('.').map((a) => (a.length < 2) ? '0' + a : a).join('.'),

        'time': `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
            .split(':').map((b) => (b.length < 2) ? '0' + b : b ).join(':')
    };
}


module.exports = {getDateTimeStr, allThrow};
