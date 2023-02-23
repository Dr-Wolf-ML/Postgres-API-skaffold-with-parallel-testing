/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    `
        ALTER TABLE users
        ADD CONSTRAINT uniqueUser UNIQUE (username);
    `;
};

exports.down = (pgm) => {
    `
        ALTER TABLE users
        DROP CONSTRAINT uniqueUser UNIQUE (username);
    `;
};
