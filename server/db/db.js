const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = (process.env.DATABASE_NAME || 'mussbuss') + (process.env.NODE_ENV === 'test' ? '-test' : '')
const db = new Sequelize(databaseName, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_URL || 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
  })
  
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}