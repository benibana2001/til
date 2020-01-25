import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import AdminPage from './AdminPage'
import ProductsPage from './ProductsPage'
import Header from './Header'

const Routes: React.SFC = () => {
    return (
        <Router>
            <div>
                <Header />
                {/* <Switch>
                    <Route path="/products">
                        <ProductsPage />
                    </Route>
                    <Route path="/admin">
                        <AdminPage />
                    </Route>
                </Switch> */}
                <Route path="/products" component={ProductsPage} />
                <Route path="/admin" component={AdminPage} />
            </div>
        </Router>
    )
}
export default Routes