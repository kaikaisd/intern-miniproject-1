import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache,
  defaultOptions:  {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default {
  async fetchItems() {
    const { data } = await client.query({
      query: gql`
        query {
          notebooks {
            id
            title
            contents
          }
        }
      `
    });
    return data.notebooks;
  },

  async getItem(id){
    const { data } = await client.query({
      query: gql`
        query {
          notebook(id: ${id}) {
            id
            title
            contents
          }
        }
      `
    });
    return data.notebook;
  },

  async editItem(id, title ,contents){
    const { data } = await client.mutate({
      mutation: gql`
        mutation {
          updateNotebook(id: ${id}, title: "${title}" ,contents: "${contents}") {
            title
            contents
          }
        }
      `
    });
    return data.updateNotebook;
  },

  async deleteItem(id){
    const { data } = await client.mutate({
      mutation: gql`
        mutation {
          deleteNotebook(id: ${id}) {
            id
          }
        }
      `
    });
    return data.deleteNotebook;
  },

  async addItem(title, contents){
    const { data } = await client.mutate({
      mutation: gql`
        mutation {
          addNotebook(title: "${title}", contents: "${contents}") {
            title
            contents
          }
        }
      `
    });
    return data.addNotebook;
  }
};

