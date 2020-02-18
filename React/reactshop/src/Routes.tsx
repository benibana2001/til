import * as React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './Header'
import AdminPage from './AdminPage'
import ProductsPage from './ProductsPage'
import ProductPage from './ProductPage'

const Routes: React.SFC = () => {
    return (
        <Router>
            <div>
                <Header />
                {/* During rendering, if the path in a Route component matches the current path, the component will be rendered, */}
                {/*   - https://reacttraining.com/react-router/web/api/NavLink/exact-bool */}
                <Route exact={true} path='/products'><ProductsPage /></Route>
                {/*   - https://reacttraining.com/react-router/web/api/Route/component */}
                <Route path='/products/:id' component={ProductPage} />
                <Route path='/admin'><AdminPage /></Route></div>
        </Router>
    )
}

export default Routes