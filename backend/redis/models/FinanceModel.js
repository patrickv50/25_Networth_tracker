const { Client, Entity, Repository, Schema } = require('redis-om')
class Finance extends Entity { }
let schema = new Schema(
    Finance,
    {
        assets: { type: ''},
        liabilities: { type: 'text'},
        createdAt: { type: 'date' },
    },
    {
        dataStructure: "JSON"
    }
)

module.exports = schema