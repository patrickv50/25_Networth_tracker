const { Client, Entity, Repository, Schema } = require('redis-om')
class Profile extends Entity { }
let schema = new Schema(
    Profile,
    {
        symbol: { type: 'string' },
        volAvg:{type:'number'},
        mktCap:{type:'number'},
        changes:{type:'number'},
        companyName:{type:'string'},
        ceo: { type: 'string' },
        ipoDate: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        description: { type: 'string' },
    },
    {
        dataStructure: "JSON"
    }
)

module.exports = schema