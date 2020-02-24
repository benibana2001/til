import * as React from "react"
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom"
import "url-search-params-polyfill"

import logo from "./logo.svg"

const Header: React.SFC<RouteComponentProps> = props => {
    const [search, setSearch] = React.useState("");
    React.useEffect(() => {
        const searchParms = new URLSearchParams(props.location.search)
        setSearch(searchParms.get('search') || "")
    }, [props.location.search])
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };
    // This needs to add the search state value to the path query string when the Enter key is pressed.
    //   We can leverage the push method in the history prop that RouteComponentProps gives us
    const handleSearchKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") props.history.push(`/products?search=${search}`)
    };
    return (
        <header className="header">
            <div className="search-container">
                <input
                    type="search"
                    placeholder="search"
                    value={search}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeydown}
                />
            </div>
            <img src={logo} className="header-logo" alt="logo" />
            <h1 className="header-title">React Shop</h1>
            <nav>
                {/* The Link component allows us to define the path where the link navigates to as well as the text to display. */}
                {/* NavLink exposes an activeClassName attribute that we can use to style the active link.  */}
                <NavLink to="/products" className="header-link" activeClassName="header-link-active">Products</NavLink>
                <NavLink to="/contactus" className="header-link" activeClassName="header-link-active">Contact Us</NavLink>
                <NavLink to="/admin" className="header-link" activeClassName="header-link-active">Admin</NavLink>
            </nav>
        </header>
    )
}

// We need to export the Header component wrapped with the withRouter higher order component
//   in order for the reference to this.props.history to work. 
export default withRouter(Header)