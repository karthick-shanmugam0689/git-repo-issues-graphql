import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client'

import { getClient } from './utils/graphqlConfig'

import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';

const Home = lazy(() => import('./routes/Home/Home'));
const Issue = lazy(() => import('./routes/Issue/Issue'));
const NotFoundPage = lazy(() => import('./routes/NotFoundPage/NotFoundPage'));

const client = getClient();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <ApolloProvider client={client}>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/issue/:issueId" component={Issue}/>
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </Suspense>
          </ApolloProvider>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App;
