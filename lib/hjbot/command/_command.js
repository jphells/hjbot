/**
 * Internal module file of 'db_interface'.
 */


class Command {

    /**
     * Creates an instance of Command.
     * @param {string} cname Command name.
     * @param {function} [action] Command action.
     * @memberof Command
     */
    constructor(cname, action=null) {
        if (null == action) {
            //@ts-ignore
            this.__action = (a) => a;
        } else this.__action = action;
        this.__name = cname.trim();
    }


    /** @readonly @memberof Command */
    //@ts-ignore
    get name() {
        return this.__name;
    }


    /** @readonly @memberof Command */
    //@ts-ignore
    get action() {
        return this.__action;
    }


    /**
     * Executes the action function of given command with given arguments.
     * @param {Command} cmd Command object.
     * @param {...any} args Args for the command.
     * @returns Return value of the action function of the command.
     */
    static execute(cmd, ...args) {
        return cmd.__action(...args);
    }
}


module.exports = Command;
