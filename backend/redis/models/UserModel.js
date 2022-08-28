const { Client, Entity, Repository, Schema } = require('redis-om')
class User extends Entity { }
let schema = new Schema(
    User,
    {
        userName: { type: 'string' },
        password:{type:'number'},
        email:{type:'number'},
        createdAt:{type:'date'},
    },
    {
        dataStructure: "JSON"
    }
)

module.exports = schema