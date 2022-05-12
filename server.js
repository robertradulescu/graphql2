var express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');



var schema = buildSchema(`

type Query {
    info(id: Int!): Persoana
    info2(id: Int!): Persoana
    info3(id: Int!): Persoana
 
}

    type Persoana {
        id: Int
        name: String
        age: Int
        passion: String
    }
`);

var persoana_Info = [
    {
        id: 1,
        name: 'Robert',
        age: 22,
        passion: 'Cars and League of Legends',

    },
    {
        id: 2,
        name: 'Alexandru',
        age: 20,
        passion: 'Coding and reading',

    },
    {
        id: 3,
        name: 'Nicoleta',
        age: 19,
        passion: 'Travelling ',

    }
]

var getID = function (args) {
    var id = args.id;
    return persoana_Info.filter(Persoana => {
        return Persoana.id == id;
    })[0];
}



var root = {
    info: getID,
    info2: getID,
    info3: getID
};


var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('localhost:4000/graphql'));