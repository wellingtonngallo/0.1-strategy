import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"
import PostgressStrategy from "./src/strategies/postgressStrategy.js"

const postgresConnectionString = 'postgres://wellingtongallo:senha0001@localhost:5432/heroes'
const postgresContext = new ContextStrategy(new PostgressStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionSTring = "mongodb://wellingtongallo:senha@localhost:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionSTring))
await mongoDBContext.connect()

const data = [{
    name: 'wellington',
    type: 'transaction'
}, {
    name: 'van',
    type: 'activityLog'
}]

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext
}

for (const {type, name} of data) {
    const context = contextTypes[type]

    await context.create({ name: name + Date.now()})

    console.log(type, context.dbStrategy.constructor.name)
    console.log(await context.read())
}