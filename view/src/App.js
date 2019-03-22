import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4466',
});

const USERS_QUERY = gql`
  query {
    users {
      id
      name
      gils
      bag {
        item {
          name
          description
          price
        }
        quantity
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Store</h1>
          <Query query={USERS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return (
                <div>
                  {data.users.map(user => {
                    return (
                      <div>
                        <div>{user.name}</div>
                        <div className="items">
                          {user.bag.map(inventory => {
                            return (
                              <div className="item">
                                <div className="item__block">
                                  <div>{inventory.item.name}</div>
                                  <div>{inventory.item.description}</div>
                                </div>
                                <div className="item__price">
                                  {inventory.item.price} Gils (
                                  {inventory.quantity} left)
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
