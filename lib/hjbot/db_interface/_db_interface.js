/**
 * Internal module file of 'db_interface'.
 */


const sqlite3     = require('sqlite3').verbose(),
      {DBError}   = require("../exceptions");


/**
 * Defines an interface to an sqlite3 database file. Create
 * a new object using the classmethod `create`.
 */
class SQLiteInterface {

    /**
     * Create a new interface to an sqlite3 database.
     * @memberof SQLiteInterface
     */
    constructor() {
        /** @type {?object} */ this.__conn = null;
        /** @type {?string} */ this.__fpath = null;
    }


    /** @memberof SQLiteInterface */
    set conn(value) {
        if (!(value instanceof sqlite3.Database))
            throw new DBError("Specified IO is not a valid " +
                "sqlite3 database.");
        this.__conn = value;
    }


    /** @memberof SQLiteInterface */
    get conn() {
        return this.__conn;
    }


    /** @memberof SQLiteInterface */
    set fpath(value) {
        this.__fpath = value;
    }


    /** @memberof SQLiteInterface */
    get fpath() {
        return this.__fpath;
    }


    /**
     * Returns a new object of this class, creating the sqlite3 file
     * if it does not exist. After creation, use `open` to open a connection
     * to that file.
     * @static @memberof SQLiteInterface
     * @param {?string} [fpath=null] File path.
     * @return {SQLiteInterface} SQLiteInterface object.
     */
    static create(fpath=null) {
        let iface = new SQLiteInterface();
        iface.fpath = fpath;
        return iface;
    }


    /**
     * Closes the active sqlite3 connection.
     * @memberof SQLiteInterface
     */
    close() {
        if (null == this.conn)
            throw new DBError("The connection is already closed.");
        //@ts-ignore
        this.conn.close();
        this.__conn = null;
    }


    /**
     * Opens the sqlite3 connection to the file at `this.fpath`.
     * @memberof SQLiteInterface
     */
    open() {
        if (null != this.conn)
            throw new DBError("The connection is already open.");
        if (null == this.fpath)
            throw new DBError("Can't open a connection as no " +
                "sqlite3 file is currently assigned to 'fpath'.");
        this.conn = new sqlite3.Database(this.fpath, (err) => {
            throw err;
        });
    }


    /**
     * Runs the parameter sql quer and yields its sesults rows.
     * @param {string} sql SQL query to run.
     * @returns {AsyncGenerator<Array<any>, void, string>} AsyncGenerator
     * @memberof SQLiteInterface
     */
    async * runQueryAsync(sql) {
        if (null == this.conn)
            throw new DBError("Can't run query as the " +
                "database is not currently connected.");
        //@ts-ignore
        for (const row of this.conn.all(sql, (err) => {
            throw err;
        }))
            yield row;
    }
}


module.exports = {SQLiteInterface};
