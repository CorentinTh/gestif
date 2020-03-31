const {join} = require('path');
const sqlite = require('better-sqlite3');

const dbPath = join(__dirname, '..', 'db.sqlite');
const db = sqlite(dbPath);

module.exports = db;