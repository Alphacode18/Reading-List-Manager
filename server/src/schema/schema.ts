import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';
import _ from 'lodash';
import Book from '../models/Book';
import Author from '../models/Author';

//Defining the types of vertices.
const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Book',
  /*fields is a function in a callback sense, so that we can
   *initalize the types, and only call fields once everything
   *is defined.
   */
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

//Defining how to enter the graph
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        //return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        //return authors;
      },
    },
  },
});

//Exporting the entire graph structure and setup to use as middleware.
export default new GraphQLSchema({
  query: RootQuery,
});
