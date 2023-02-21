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
    # continent(code: ID!): Continent
  }
`;

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
      console.log("Query language  DB: ", args)
      return data.languages.find(language => language.code === args["code"])
    },
    country: (parent, args, context, info) => {
      console.log("Query country DB: ", args)
      return data.countries.find(country => country.code === args["code"])
    },
    // continent: (parent, args, context, info) => {
    //   console.log(args)
    //   return data.continents.find(continent => continent.code === args["code"])
    // }
  },
  Country: {
    continent: (parent, args, context, info) => {
      console.log("Country continent DB:", parent)
      return data.continents.find( continent => 
        continent.code === parent.continent.code
      )
    },
    languages: (parent, args, context, info) => {
      console.log("Country languages DB:", parent)
      return data.languages.filter( language => 
        parent.languages.find( countryLanguage => 
          countryLanguage.code === language.code
        )
      )
    }
  },
  Language: {
    name: (parent, args, context, info) => {
      console.log("Language lookup name:", parent)
      return parent.name
    },
    native: (parent, args, context, info) => {
      console.log("Language lookup native:", parent)
      return parent.native
    },
    rtl: (parent, args, context, info) => {
      console.log("Language lookup rtl:", parent)
      return parent.rtl
    }
  },
  Continent: {
    name: (parent, args, context, info) => {
      console.log("Continent lookup name:", parent)
      return parent.name
    },
    countries: (parent, args, context, info) => {
      console.log("Continent countries DB:", parent)
      return data.countries.filter(country => country.continent.code === parent.code)
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