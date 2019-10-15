import React, { Component, Suspense, } from 'react';
import Layout from './components/Layouts/Layout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionTypes from './store/action/index';

const CheckOut = React.lazy(() => {
  return import('./containers/CheckOut/CheckOut')
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const Orders = React.lazy(() => {
  return import('./containers/Oreder/Oreder')
})


class App extends Component {

  componentDidMount() {
    this.props.onCheckAuth();
  }

  render () {

    let router = (
      <Switch>
          <Route path="/auth"  render={(props) => <Auth {...props}/> } />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
        ) 

        if (this.props.isAuth) {
            router = (
              <Switch>
                <Route path="/checkout"  render={(props) => <CheckOut {...props} /> } />
                <Route path="/order"  render={(props) => <Orders {...props} /> } />
                <Route path="/auth"  render={(props) => <Auth {...props}/> } />
                <Route path="/logout"  component={Logout } />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
              </Switch>
            )
        }
    return (
          <Layout>
              <Suspense fallback={<p>Loading...</p>}>{router}</Suspense>
          </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch(actionTypes.authCheck())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
