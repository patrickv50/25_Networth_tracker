const { Client, Entity, Repository, Schema } = require('redis-om')
class Listing extends Entity { }
let schema = new Schema(
    Listing,
    {
        symbol: { type: 'text', textSearch: true },
        companyName: { type: 'text', textSearch: true },
        securityName: { type: 'string' },
    },
    {
        dataStructure: "JSON"
    }
)

module.exports = schema