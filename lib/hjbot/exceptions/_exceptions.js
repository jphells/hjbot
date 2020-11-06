/**
 * Internal module file of 'exceptions'.
 */


/** 
 * General runtime error in hjbot.
 */
class RuntimeError extends Error {

    /**
     * Creates an instance of PFRuntimeError.
     * @param {...any} args Arguments.
     * @memberof PFRuntimeError
     */
    constructor(...args) {
        super(...args);
    }
}


/**
 * Common hjbot database error.
 */
class DBError extends RuntimeError {

    /**
     * Creates an instance of PFDBError.
     * @param {...any} args Arguments.
     * @memberof PFDBError
     */
    constructor(...args) {
        super(...args);
    }
}


/** 
 * An error that occurs when hjbot does not allow performing an operation, 
 * eg. running a command with insufficient privileges. 
 */
class DisallowedOperation extends RuntimeError {

    /**
     * Creates an instance of PFDisallowedOperation.
     * @param {...any} args Arguments.
     * @memberof PFDisallowedOperation
     */
    constructor(...args) {
        super(...args);
    }
}


module.exports = { 
    RuntimeError, 
    DisallowedOperation,
    DBError
};

