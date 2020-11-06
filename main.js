/**
 * hjbot client application, version 1.0.0
 * @author jphells
 */

const
    Discord                   = require('discord.js'),
    rl                        = require('readline'),
    conf                      = require('./assets/config.json'),
    Command                   = require('./lib/hjbot/command'),
    CMDLib                    = require('./lib/hjbot/cmdlib'),
    {Logger}                  = require('./lib/hjbot/logger'),
    {RuntimeError, 
     DisallowedOperation}   = require('./lib/hjbot/exceptions');



/** @type {Discord.Client} */ let client;
/** @type {Logger} */         let logger;
/** @type {rl.ReadLine} */    let iface;


class Application {

    /**
     * Main entry point of the program CLI.
     * @static @memberof Application
     * @param {?Array<string>} [argv] Array of args for the main program.
     */
    static async main(argv=null) {
        try {
            if (null == argv)
                argv = process.argv.slice(2);
            logger = new Logger("./logs");

            if (argv.length != 1) {
                logger.infoStream(`\r\n\tUsage:   node main.js <API-key>`);
                logger.infoStream(`\tExample: node main.js "12345"\r\n`);
                process.exit(0);
            }

            Application.createReadLine();
            Application.createExitHandling();

            await Application.createClient(argv[0]);

        } catch (err) {
            await logger.error(`Uncaught ${err}`);
            process.exit();
        }
    }


    /**
     * Creates a Discord.Client instance, connects to it with the given API key and 
     * returns the created object.
     * @static @memberof Application
     * @param {string} apiKey API key used for connection.
     * @return {Promise<void>} Discord.Client instance.
     */
    static async createClient(apiKey) {
        client = new Discord.Client();
        client.once('ready', async () => {
            logger.infoStream(`\r\n>> Application hjbot started! ` +
                `Welcome ${client.user.tag}!`);
            await logger.writeToLogfile(`hjbot started, user ` +
                `'${client.user.tag}' ready.`);
        });
        client.on('error', async (err) => {
            await logger.error(`Error: Discord.Client - ${err.message}`);
        });

        return await client.login(apiKey).then(async () => {
            await logger.info(`${client.user.tag} is listening commands...`);
        }).catch(async (err) => {
            await logger.error(`Error: Discord.Client - ${err.message}`);
            process.exit();
        });
    }


    /**
     * Creates a console readline interface and binds SIGINT to it.
     * @static @memberof Application
     */
    static createReadLine() {
        iface = rl.createInterface({
            input: process.stdin, output: process.stdout
        });
        //@ts-ignore
        iface.on("SIGINT", () => process.emit("SIGINT") );
    }


    /**
     * Creates event listeners for exit events of the Node.js process.
     * @static @memberof Application
     */
    static createExitHandling() {
        process.on('exit', 
            Application.exitProgram.bind(null, 0,
                {message: 'hjbot exit. \r\n'}));

        process.on('SIGINT', 
            Application.exitProgram.bind(null, 0,
                {message: 'Keyboard interrupt'}));

        process.on('SIGUSR1', 
            Application.exitProgram.bind(null, 0,
                {message: 'hjbot process was killed'}));

        process.on('SIGUSR2', 
            Application.exitProgram.bind(null, 0,
                {message: 'hjbot process was killed'}));

        process.on('UncaughtException', 
            Application.exitProgram.bind(null, 0,
                {message: 'Uncaught exception occurred'}));
    }


    /**
     * Exits the Node.js process and destroys the active Discord.Client if it exists. Logs the 
     * exit to the current logfile.
     * @static @memberof Application
     * @param {number} code Exit code.
     * @param {{message: string}} info Exit information.
     */
    static exitProgram(code, info) {
        try {
            logger.syncInfo(info.message);
            if (client) client.destroy(); 
        } catch(err) {
            logger.errStream(`>> Error - ${err}`); 
        } finally {
            iface.close();
            process.exit(code);
        }
    }
}


if (require.main == module)
    Application.main();

