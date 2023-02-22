
// Articles
// https://www.apollographql.com/blog/backend/using-express-with-graphql-server-node-js/
// 

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const data = require('./countries.js');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type Country @cacheControl(maxAge: 50) {
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

let getCountry = (code) => data.countries.find( country =>
    country.code === code
  )

let getLanguage = (code) => data.languages.find( language =>
    language.code === code
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
      let res = getLanguage(args["code"])
      console.log("Query DB language res: ", res)
      return res
    },
    country: (parent, args, context, info) => {
      console.log("Query DB country: ", args)
      let res = getCountry(args["code"])
      console.log("Query DB country res: ", res)
      return res
    },
    continent: (parent, args, context, info) => {
      console.log("Query DB continent: ", args)
      let res = getContinent(args["code"])
      console.log("Query DB continent res: ", res)
      return res
    }
  },
  Country: {
    continent: (parent, args, context, info) => {
      console.log("Country DB continent:", parent.code, parent.continent.code)
      let res = getContinent(parent.continent.code)
      console.log("Country DB continent res:", res)
      return res
    },
    languages: (parent, args, context, info) => {
      console.log("Country DB languages:", parent.code, parent.languages) 
      let res = parent.languages.map( countryLanguage =>
        getLanguage(countryLanguage.code)
      )
      console.log("Country DB languages res:", res)
      return res
    }
  },
  Language: {
    name: (parent, args, context, info) => {
      console.log("Language lookup name:", parent.code, parent.name)
      return parent.name
    },
    native: (parent, args, context, info) => {
      console.log("Language lookup native:", parent.code, parent.native)
      return parent.native
    },
    rtl: (parent, args, context, info) => {
      console.log("Language lookup rtl:", parent.code, parent.rtl)
      return parent.rtl
    }
  },
  Continent: {
    name: (parent, args, context, info) => {
      console.log("Continent lookup name:", parent.code, parent.name)
      return parent.name
    },
    countries: (parent, args, context, info) => {
      console.log("Continent DB countries:", parent.code, parent.countries)
      // let res = data.countries.filter(country => country.continent.code === parent.code)
      let res = parent.countries.map( continentCountry =>
        getCountry(continentCountry.code)
      )
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