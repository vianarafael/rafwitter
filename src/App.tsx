import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 

import Login from './pages/Login'
import Signup from './pages/Signup'
import Landing from './components/Landing'
import { setContext } from 'apollo-link-context'

const httpLink = new HttpLink({uri: 'http://localhost:4000'})
const authLink = setContext(async(req, {headers}) => {
  const token = localStorage.getItem('token')

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}`: null
    }
  }
})

const link = authLink.concat(httpLink as any)
const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <p>Nooooo</p>
          </Route>
          <Route exact path="/landing">
            <Landing />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route>
            <Login />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
