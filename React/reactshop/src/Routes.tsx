import * as React from 'react'
import { Suspense } from "react"
import { BrowserRouter as Router, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Header from './Header'
// import AdminPage from './AdminPage'
import ProductsPage from './ProductsPage'
import ProductPage from './ProductPage'
import LoginPage from './LoginPage'
import NotFoundPage from "./NotFoundPage"
import ContactUsPage from "./ContactUsPage"

// We use a React function called lazy which takes in a function that returns a dynamic import
//   , which in turn is assigned to our AdminPage component variable.
// For dynamic import, we should add the lib compiler option in tsconfig.json.
const AdminPage = React.lazy(() => import('./AdminPage'))

// We use TransitionGroup for transition, but it needs history property to catch to page move.
//   Unfortunately, we can't use the withRouter higher order component because this would be outside the Router component.
//   To resolve this, we can add a new component called RoutesWrap, which doesn't take in any props and wraps our existing Routes component. 
const RoutesWrap: React.SFC = () => {
    return (
        <Router>
            <Route component={Routes} />
        </Router>
    )
}

const Routes: React.SFC<RouteComponentProps> = (props) => {
    const [loggedIn, setLoggedIn] = React.useState(true)
    return (
        <div>
            <Header />
            {/* The Switch component renders only the first matching Route component. 
                      So, in this code, using Switch to not render NotFoundPage component at each page. */}
            <TransitionGroup>
                <CSSTransition
                    key={props.location.key}
                    timeout={500}
                    classNames="animate"
                >
                    <Switch>
                        {/* During rendering, if the path in a Route component matches the current path, the component will be rendered, */}
                        <Redirect exact={true} from="/" to="/products" />
                        {/*   - https://reacttraining.com/react-router/web/api/NavLink/exact-bool */}
                        <Route exact={true} path='/products' component={ProductsPage} />
                        {/*   - https://reacttraining.com/react-router/web/api/Route/component */}
                        {/*       - When use RouteComponentProps, we shoud use component propety in Route statement */}
                        <Route path='/products/:id' component={ProductPage} />
                        <Route path='/contactus' component={ContactUsPage} />
                        <Route path='/admin'>
                            {/* fallback means 'alternative' or 'substitute' */}
                            {loggedIn ? (<Suspense fallback={<div className="page-container">Loading</div>}>
                                <AdminPage />
                                </Suspense>) : (<Redirect to="/login" />)}</Route>
                        <Route path="/login"><LoginPage /></Route>
                        <Route component={NotFoundPage} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}

export default RoutesWrap