import graphql from 'graphql';

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//Defining the types of vertices.
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

//Defining how to enter the graph
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db/ other source.
      },
    },
  },
});

//Exporting the entire graph structure and setup to use as middleware.
export default new GraphQLSchema({
  query: RootQuery,
});
