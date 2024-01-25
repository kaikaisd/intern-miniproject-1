// api.mjs
import { ApolloServer, gql } from 'apollo-server-express';
import Sequelize from 'sequelize';

// Connect to MySQL database
const sequelize = new Sequelize('notebook', 'notebook', 'pwd12345', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define your data model
const Notebook = sequelize.define('notebook', {
  id: { type:Sequelize.INTEGER, primaryKey: true},
  title: Sequelize.STRING,
  contents: Sequelize.TEXT
}, {
  timestamps: false,
  freezeTableName: true,
});

// Define your GraphQL schema
const typeDefs = gql`
  type Notebook {
    id: Int!
    title: String!
    contents: String!
  }

  type Query {
    notebooks: [Notebook]
    notebook(id: Int!): Notebook
  }

  type Mutation {
    addNotebook(title: String!, contents: String!): Notebook
    updateNotebook(id: Int!, title: String! , contents: String!): Notebook
    deleteNotebook(id: Int!): Notebook
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    notebooks: () => Notebook.findAll(),
    notebook: (_, { id }) => Notebook.findByPk(id),
  },
  Mutation: {
    addNotebook: (_, { title, contents }) => Notebook.create({ title, contents }),
    updateNotebook: async (_, { id, title, contents }) => {
      let notebook = await Notebook.findByPk(id);
      if (title) notebook.title = title;
      if (contents) notebook.contents = contents;
      await notebook.save();
      return notebook;
    },
    deleteNotebook: async (_, { id }) => {
      let notebook = await Notebook.findByPk(id);
      await notebook.destroy();
      return notebook;
    },
  },
};

// Create the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

export default server;