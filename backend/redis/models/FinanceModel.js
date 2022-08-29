const { Client, Entity, Repository, Schema } = require('redis-om')
class Finance extends Entity { }
let schema = new Schema(
    Finance,
    {
        deviceId: {type:'string'},
        month: {type:'string'},
        assets: { type: 'string'},
        liabilities: { type: 'string'},
        expenses: { type: 'string'},
        incomes: { type: 'string'},
        createdAt: { type: 'date' },
    },
    {
        dataStructure: "JSON"
    }
)

module.exports = schema