/**
 * Tests for hjbot commands.
 */

const Assert = require('assert'),
     Command = require('../lib/hjbot/command');


describe('hjbot commands test:', () => {

    it('command - Can create new, execute, get properties of Command objects.', 
        () => {
            var comm2 = new Command('testcom2', 
                /**@param {number} a*/ (a) =>  a + 15 );
            var comm3 = new Command('testcom3',
                /**@param {...number} args*/ (...args) => { 
                return [...args].reduce((a, b) => a + b); 
            });
            //@ts-ignore
            Assert.strictEqual(Command.execute(comm2, 5), 20);
            //@ts-ignore
            Assert.strictEqual(Command.execute(comm3, 1, 2, 3, 4, -3, 4), 11);
            //@ts-ignore
            Assert.strictEqual(comm2.name, 'testcom2');
            //@ts-ignore
            Assert.strictEqual(comm3.name, 'testcom3');
            //@ts-ignore
            Assert.strictEqual(typeof comm3.action, 'function');
    });
});
