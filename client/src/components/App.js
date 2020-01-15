import React from 'react'
import client from '../apolloClient.js'
import Login from './Login'
import Register from './Register'
import Map from './Map'
import Header from './Header'
import Profile from './Profile'
import { ApolloProvider } from 'react-apollo'
import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import EditProfile from './Profile/EditProfile'

function App() {
  return(
    <ApolloProvider client={client}>
      <BrowserRouter>
       <Header/>
        <Switch>
          <Route 
            exact path='/profile'
            render={props => <Profile {...props} client={client}/>}
          />
          <Route 
            exact path='/edit_profile'
            render={props => <EditProfile {...props} client={client}/>}
          />
          <Route
            exact path='/'
            render={props => <Map {...props} client={client}/>}
          />
          <Route 
            exact path='/register'
            render={props=> localStorage.getItem('token') ? 
             (<Redirect to={{ pathname: '/'}}/>) : (<Register {...props} client={client}/>)}
          />
          <Route 
            exact path='/login' 
            render={props => localStorage.getItem('token') ? 
             (<Redirect to={{ pathname: '/'}}/>) : (<Login {...props} client={client}/>)}
          />
          <ProtectedRoute>
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

// handle logged out, or expired token
function ProtectedRoute({
  children,
  ...props
}){
  return(
    <Route render={props => {
      return(
        localStorage.getItem('token') ? (children) : (<Redirect to={{ pathname: '/login'}}/>)
      )
    }}/>
  )
}

export default App