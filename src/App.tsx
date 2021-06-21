import React from 'react'
import './App.css';
import { ApolloProvider } from '@apollo/client'
import { getClient } from './utils/graphqlConfig'
import UserContainer from './container/UserContainer/UserContainer';

const client = getClient();

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <UserContainer/>
      </ApolloProvider>
    </div>
  )
}

export default App;
