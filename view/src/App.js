import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import {Provider} from 'react-redux'
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home'
import Inventory from './components/inventory'
import './App.css';
import store from './store'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router className="App">
            <div className="Main">
              <Route exact path="/" component={Home} />
              <Route path="/inventory/:name" component={Inventory} />
            </div>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
