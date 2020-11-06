/**
 * Internal module file of 'exceptions'.
 */


/** 
 * General runtime error in hjbot.
 */
class RuntimeError extends Error {

    /**
     * Creates an instance of RuntimeError.
     * @param {...any} args Arguments.
     * @memberof RuntimeError
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
     * Creates an instance of DBError.
     * @param {...any} args Arguments.
     * @memberof DBError
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
     * Creates an instance of DisallowedOperation.
     * @param {...any} args Arguments.
     * @memberof DisallowedOperation
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

