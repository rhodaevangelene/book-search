const { gql } = require('apollo-server-express')

// create typeDefs
const typeDefs = gql`
  type Books {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    savedBooks: [Books]
  }

  type Query {
    me: User
    getSingleUser(_id: ID, username: String): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: String!, description: String!, title: String!): User
    deleteBook(bookId: String!): User
  }
  `

module.exports = typeDefs
