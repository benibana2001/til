import * as React from 'react'
import { NavLink } from 'react-router-dom'

const Header: React.SFC = () => {
    return (
        <header className="header">
            <h1 className="header-title">
                猫の宴
            </h1>
            <nav>
                <NavLink to="products" className="header-link"
                    activeClassName="header-link-active">
                    Products
                </NavLink>
                <NavLink to="/admin" className="header-link"
                    activeClassName="header-link-active">
                    Admin
                </NavLink>
            </nav>
        </header>
    )
}
export default Header