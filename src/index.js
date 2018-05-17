const { GraphQLServer } = require('graphql-yoga');

// Your awesome GraphQL server here
const inMemoryPosts = [{
  id: 1,
  title: 'post1',
  description: 'opt'
},
{
  id: 1,
  title: 'post2'
}];

const typeDefs = ` # определеяем API сервака
  type Post {
    id: ID! # обязательно должно быть '!'
    title: String!
    description: String # опциональный параметр
  }

  type Query {
    # prints simple string / String! не обязательно
    helloWorld: String!
    posts: [Post!]! # вернуть без Null постов обязательно должно вернуть
  }
`;

const resolvers = { //
  Query: {
    helloWorld: () => {
      return 'Hello Workshop!';
    },
    posts: () => {
      return inMemoryPosts;
    }
  }
};

// `
// query {
//   helloWorld
// }
// `

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));