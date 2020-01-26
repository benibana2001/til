import * as React from 'react'
import { Suspense } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom'

// import Home from './Home'
// import AdminPage from './AdminPage'
import ProductsPage from './ProductsPage'
import ProductPage from './ProductPage'
import Header from './Header'
import NotFoundPage from './NotFoundPage'
import LoginPage from './LoginPage'

const AdminPage = React.lazy(() => import('./AdminPage'))

const Routes: React.SFC = () => {
    const [loggedIn, setLoggedIn] = React.useState(false)
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Redirect exact={true} from="/" to="/products" />
                    <Route exact={true} path="/products" component={ProductsPage} />
                    <Route path="/products/:id" component={ProductPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/admin">
                        {
                            loggedIn ? (
                                <Suspense fallback={
                                    <div className="page-container">Loading...</div>
                                }>
                                    <AdminPage />
                                </Suspense>
                            )
                                : <Redirect to="/login" />
                        }
                    </Route>
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    )
}
export default Routes