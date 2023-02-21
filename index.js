const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const data = require('./countries.js');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Country {
    code: ID!
    name: String!
    continent: Continent!
    languages: [Language!]!
  }

  type Continent {
    code: ID!
    name: String!
    countries: [Country!]!
  }

  type Language {
    code: ID!
    name: String
    native: String
    rtl: Boolean!
  }

  type Query {
    # hello: String,
    # hellos: [String],
    # helloParams(name: String): String,
    countries: [Country],
    # languages: [Language],
    language(code: ID!): Language,
    country(code: ID!): Country,
    continent(code: ID!): Continent
  }
`;

let getContinent = (code) => data.continents.find( continent => 
    continent.code === code
  )

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    // hello: () => 'Hello world!',
    // hellos: () => ['Hello world!', 'Hello world!'],
    // helloParams: (parent, args, context, info) => {
    //   console.log(args)
    //   return `Hello ${args["name"]}!`
    // },
    countries: () => data.countries,
    // languages: () => data.languages,
    language: (parent, args, context, info) => {
      console.log("Query DB language: ", args)
      let res = data.languages.find(language => language.code === args["code"])
      console.log("Query DB language res: ", res)
      return res
    },
    country: (parent, args, context, info) => {
      console.log("Query DB country: ", args)
      let res = data.countries.find(country => country.code === args["code"])
      console.log("Query DB country res: ", res)
      return res
    },
    continent: (parent, args, context, info) => {
      console.log("Query DB continent: ", args)
      // let res = data.continents.find(continent => continent.code === args["code"])
      let res = getContinent(args["code"])
      console.log("Query DB continent res: ", res)
      return res
    }
  },
  Country: {
    // continent: (parent, args, context, info) => {
    //   console.log("Country DB continent2:", info.variableValues)
    //   let res = getContinent(parent.continent.code)
    //   console.log("Country DB continent2 res:", res)
    //   return res
    // },
    continent: (parent, args, context, info) => {
      console.log("Country DB continent:", parent.continent.code)
      // let res = data.continents.find( continent => 
      //   continent.code === parent.continent.code
      // )
      let res = getContinent(parent.continent.code)
      console.log("Country DB continent res:", res)
      return res
    },
    languages: (parent, args, context, info) => {
      console.log("Country DB languages:", parent.languages)
      let res = data.languages.filter( language => 
        parent.languages.find( countryLanguage => 
          countryLanguage.code === language.code
        )
      )
      console.log("Country DB languages res:", res)
      return res
    }
  },
  Language: {
    name: (parent, args, context, info) => {
      console.log("Language lookup name:", parent.name)
      return parent.name
    },
    native: (parent, args, context, info) => {
      console.log("Language lookup native:", parent.native)
      return parent.native
    },
    rtl: (parent, args, context, info) => {
      console.log("Language lookup rtl:", parent.rtl)
      return parent.rtl
    }
  },
  Continent: {
    name: (parent, args, context, info) => {
      console.log("Continent lookup name:", parent.name)
      return parent.name
    },
    countries: (parent, args, context, info) => {
      console.log("Continent DB countries:", parent.code, parent.countries)
      let res = data.countries.filter(country => country.continent.code === parent.code)
      console.log("Continent DB countries res:", res)
      return res
    }
  }
};

// console.log("data.language= " + data.languages)

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.start()
  .then(() => {
    console.log("Server started")
    server.applyMiddleware({ app });
  });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);