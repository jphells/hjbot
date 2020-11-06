/**
 * Unit tests for database actions.
 */

const {SQLiteInterface} = require('../lib/hjbot/db_interface'),
      {DBError}         = require('../lib/hjbot/exceptions'),
      {allThrow}        = require('../lib/hjbot/util');


describe("hjbot database test:", () => {
    it("db_interface - Can connect and query the database.",
        async () => {
            //@ts-ignore
            await allThrow(DBError,
                () => {var a = SQLiteInterface.create(); a.close();},
                () => {var a = new SQLiteInterface(); a.open();},
                async () => {
                        var a = new SQLiteInterface();
                        for await (const ln of a.runQueryAsync(""));
                    }
                );
        }
    );
});