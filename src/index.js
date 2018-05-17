const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding');


const resolvers = {
  Query: {
    users: (_, args, context, info) => {
      return context.db.query.users({}, info);
    }
  },
  // Mutation: {
  //   createDraft: (_, args) => {
  //     const newDraft = {
  //       id: `post-${idCount++}`,
  //       title: args.title,
  //       content: args.content,
  //       published: false
  //     }
  //     postData.push(newDraft)
  //     return newDraft
  //   },
  //   publish: (_, args) => {
  //     const postToPublish = postData.find(post => post.id === args.id)
  //     postToPublish.published = true
  //     return postToPublish
  //   },
  //   deletePost: (_, args) => {
  //     const postToDeleteIndex = postData.findIndex(post => post.id === args.id)
  //     if (postToDeleteIndex > -1) {
  //       const deleted = postData.splice(postToDeleteIndex, 1)
  //       return deleted[0]
  //     }
  //     return null
  //   }
  // }
}

// const server = new GraphQLServer({
//   typeDefs: './src/schema.graphql', // импортируем структуру
//   resolvers,
// })
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql', // импортируем структуру
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './generated/prisma.graphql',
      endpoint: "https://eu1.prisma.sh/xpom55-2ab967/database/dev"
    })
  })
});
server.start(() =>
  console.log(`GraphQL server is running on http://localhost:4000`),
)
