const { GraphQLServer } = require('graphql-yoga')

let postData = [
  {
    id: 1,
    title: '',
    content: '',
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
  posts(searchString: String): [Post!]!
  post(id: ID!): Post
}

input CreatePostInput { # не разрешает циклические зависимости
  id: Int!
  title: String!
  content: String!
}

type Mutation {
  createPost(input: CreatePostInput): Post!
}
`

// mutation {
//   createPost(input: {
//     id: 1,
//     title: "new post",
//     content: "hello world"
//   }) {
//     id
//   }
// }


const resolvers = {
  Mutation: {
    createPost: (_, args) => {
      const { input: { title, content, id }} = args;
      const newPost = {
        id,
        title,
        content,
        publish: false
      };
      postData.push(newPost);
      return newPost;
    }
  },
  Query: {
    info: () => `This is the API for a simple blogging application.`,
    posts: (_, args) => {
      return args.searchString
        ? postData.filter(
            post =>
              post.title.includes(args.searchString) ||
              post.content.includes(args.searchString),
          )
        : postData
    },
    post: (_, args) => {
      return postData.find(post => post.id === args.id)
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() =>
  console.log(`GraphQL server is running on http://localhost:4000`),
)
