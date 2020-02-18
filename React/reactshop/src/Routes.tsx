import * as React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Header from './Header'
import AdminPage from './AdminPage'
import ProductsPage from './ProductsPage'
import ProductPage from './ProductPage'
import LoginPage from './LoginPage'
import NotFoundPage from "./NotFoundPage"

const Routes: React.SFC = () => {
    const [loggedIn, setLoggedIn] = React.useState(true)
    return (
        <Router>
            <div>
                <Header />
                {/* The Switch component renders only the first matching Route component. 
                      So, in this code, using Switch to not render NotFoundPage component at each page. */}
                <Switch>
                    {/* During rendering, if the path in a Route component matches the current path, the component will be rendered, */}
                    <Redirect exact={true} from="/" to="/products" />
                    {/*   - https://reacttraining.com/react-router/web/api/NavLink/exact-bool */}
                    <Route exact={true} path='/products' component={ProductsPage} />
                    {/*   - https://reacttraining.com/react-router/web/api/Route/component */}
                    {/*       - When use RouteComponentProps, we shoud use component propety in Route statement */}
                    <Route path='/products/:id' component={ProductPage} />
                    <Route path='/admin'>
                        {loggedIn ? <AdminPage /> : <Redirect to="/login" />}</Route>
                    <Route path="/login"><LoginPage /></Route>
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    )
}

export default Routes