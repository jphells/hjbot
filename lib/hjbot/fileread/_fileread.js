/**
 * Internal module file of 'fileread'.
 */


const fs = require('fs'),
      rl = require("readline");


/**
 * Read lines from the file at the given path.
 * 
 * Usage:
 * ```js
 * let rdr = new FileReader("file.txt");
 * for await (const line of rdr.asyncLines) {
 *     // process line asynchronously..
 * };
 * ```
 */
class FileReader {

    /**
     * Creates an instance of FileReader.
     * @param {fs.PathLike} fpath Path of the file to read.
     * @memberof FileReader
     */
    constructor(fpath) {
        let io = fs.createReadStream(fpath);
        let stream = rl.createInterface({
            input: io,
            crlfDelay: Infinity
        });

        this.asyncLines = {
            async * [Symbol.asyncIterator]() {
                for await (const ln of stream)
                    yield ln;
            }
        };
    }
}


module.exports = {FileReader};
