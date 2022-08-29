const { Client, Entity, Repository, Schema } = require('redis-om')
class Finance extends Entity { }
let schema = new Schema(
    Finance,
    {
        deviceId: { type: 'text', textSearch: true },
        date: { type: 'date' },
        data: { type: 'string' },
        createdAt: { type: 'date' },
        test: { type: 'text', textSearch: true },
        // assets: { type: 'string' },
        // liabilities: { type: 'string' },
        // expenses: { type: 'string' },
        // incomes: { type: 'string' },
        // totAssets: { type: 'number' },
        // totLiabilites: { type: 'number' },
        // totIncome: { type: 'number' },
        // totExpense: { type: 'number' },
        // createdAt: { type: 'date' },
    },
    {
        dataStructure: "JSON"
    }
)

module.exports = schema