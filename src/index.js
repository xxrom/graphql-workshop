const { GraphQLServer } = require("graphql-yoga");

const postData = [
  {
    id: 1,
    title: "post1",
    content: "",
    published: false
  },
  {
    id: 2,
    title: "post2",
    content: "",
    published: false
  }
];

const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
  }

  type Query {
    info: String!
    posts: [Post!]!
    post(id: ID!): Post # можно вместо ID написать Int
  }
`;

// query {
//   post(id: 2) {
//     title
//   }
// }

const resolvers = {
  Query: {
    info: () => `This is the API for a simple blogging application.`,
    posts: () => postData,
    post: (_, args, context) => { // context = { id: '1' } // глобальная переменная для передачи
      // context = conext.push({ id: '122' });

      console.log(args);
      // console.log(context);
      const { id } = args;
      return postData.find(p => p.id === Number(id));
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() =>
  console.log(`GraphQL server is running on http://localhost:4000`)
);
