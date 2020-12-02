"use strict";
// Update with your config settings.
module.exports = {
    production: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '339150sa',
            database: "nodemysql"
        },
        pool: {
            min: 2,
            max: 10
        },
    }
};
