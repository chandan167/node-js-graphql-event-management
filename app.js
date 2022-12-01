const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
    type RootQuery {
        events : [String!]!
    }

    type RootMutation {
        createEvent(name:String):String
    }
   schema {
        query: RootQuery,
        mutation: RootMutation
      }
    `),
    rootValue: {
        events : () => {
            return ['First Event', 'Second Event', 'Third Event']
        },
        createEvent: ({name}) => {
            return name
        }
    },
    graphiql: true
}))

app.listen(3000, () => {
    console.log('app is running on port, http://localhost:3000/graphql', 3000)
})

