const { Client, Entity, Repository, Schema } = require('redis-om')
class Quote extends Entity { }
let schema = new Schema(
    Quote,
    {
        current: { type: 'number' },
        change: { type: 'number' },
        percentChange: { type: 'number' },
        high: { type: 'number' },
        low: { type: 'number' },
        createdAt: { type: 'date' }
    },
    {
        dataStructure: "JSON"
    }
)

module.exports = schema