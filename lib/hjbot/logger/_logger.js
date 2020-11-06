/**
 * Internal module file of 'logger'.
 */

const fs               = require('fs'),
      {getDateTimeStr} = require('../util');


/**
 * Logger tool that performs error- and infomessage writing
 * to the output streams and logfiles.
 */
class Logger {

    /**
     * @param {fs.PathLike} fpath Folder path of logfiles.
     * @param {function} [infoStream=console.log] Info stream.
     * @param {function} [errStream=console.error] Error stream.
     * @memberof Logger
     */
    constructor(
            fpath, 
            infoStream = console.log, 
            errStream = console.error
        ) {
        this.createLogDir(fpath);
        this.fpath = fpath;
        this.infoStream = infoStream;
        this.errStream = errStream;
    }


    /**
     * Asynchronously writes a message to this Logger's infostream and logfile.
     * @param {string} message Message to write.
     * @memberof Logger
     */
    async info(message) {
        this.infoStream(`<< ${message}`);
        this.writeToLogfile(message);
    }


    /**
     * Synchronously writes a message to this Logger's infostream and logfile.
     * @param {string} message Message to write.
     * @memberof Logger
     */
    syncInfo(message) {
        var dts = getDateTimeStr();
        var fname = `${this.fpath}/hjbot_log${dts['date'].replace(/[.]/g, '')}.txt`;
        this.infoStream(`<< ${message}`);

        fs.appendFileSync(fname, `${dts['time']} - ${message}\r\n`);
    }


    /**
     * Asynchronously writes a message to this Logger's error stream and logfile.
     * @param {string} message Message to write.
     * @memberof Logger
     */
    async error(message) {
        this.errStream(`>> ${message}`);
        this.writeToLogfile(message);
    }


    /**
     * Creates a directory for logfiles if it does not exist yet.
     * @param {fs.PathLike} fldr Folder name.
     * @memberof Logger
     */
    createLogDir(fldr) {
        try {
            if (!fs.existsSync(fldr))
                fs.mkdirSync(fldr);
        } catch(err) {
            this.error(`${err}`);
        }
    }


    /**
     * Writes content to a logfile. The file will be created if it does not exist.
     * @param {string} content Content to be written to the log file.
     * @memberof Logger
     */
    async writeToLogfile(content) {
        try {        
            var dts = getDateTimeStr();
            var fp = `${this.fpath}/hjbot_log${dts['date']
                                    .replace(/[.]/g, '')}.txt`;
            fs.appendFileSync(fp, `${dts['time']} - ${content}\r\n`);
        } catch(err) {
            this.errStream(`>> ${err}`);
        }
    }
}


module.exports = {Logger};
