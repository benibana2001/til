import * as React from "react"
import { NavLink } from "react-router-dom"

import logo from "./logo.svg"

const Header: React.SFC = () => {
    return (
        <header className="header">
            <img src={logo} className="header-logo" alt="logo"/>
            <h1 className="header-title">React Shop</h1>
            <nav>
                {/* The Link component allows us to define the path where the link navigates to as well as the text to display. */}
                {/* NavLink exposes an activeClassName attribute that we can use to style the active link.  */}
                <NavLink to="/products" className="header-link" activeClassName="header-link-active">Products</NavLink>
                <NavLink to="/admin" className="header-link" activeClassName="header-link-active">Admin</NavLink>
            </nav>
        </header>
    )
}

export default Header