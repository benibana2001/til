import * as React from "react"
import { NavLink, Route, RouteComponentProps } from "react-router-dom"

const AdminPage: React.SFC = () => {
    return (
        <div className="page-container">
            <h1>Admin Panel</h1>
            {/* The situation NavLink most used is as a header */}
            {/*   In here, we create Nested routes, so that implement Navlink. */}
            <ul className="admin-sections">
                <li key="users">
                    <NavLink to={`/admin/users`} activeClassName="admin-link-active">Users</NavLink></li>
                <li key="products">
                    <NavLink to={`/admin/products`} activeClassName="admin-link-active">Products</NavLink></li>
            </ul>
            <Route path="/admin/users" component={AdminUsers} />
            <Route path="/admin/products" component={AdminProducts} />
        </div>
    )
}

const AdminProducts: React.SFC = () => {
    return <div>Some options to administer products</div>
}

/**
 * AdminUsers
 */
interface IUser {
    id: number
    name: string
    isAdmin: boolean
}
const adminUsersData: IUser[] = [
    { id: 1, name: "Fred", isAdmin: true },
    { id: 2, name: "Bob", isAdmin: false },
    { id: 3, name: "Jane", isAdmin: true }
]
// We create Nested link in this SFC.
const AdminUsers: React.SFC = () => {
    return (
        <div>
            <ul className="admin-sections">
                {adminUsersData.map(user => (
                    <li key={user.id}>
                        <NavLink
                            to={`/admin/users/${user.id}`}
                            activeClassName="admin-link-active"
                        >
                            {user.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <Route path="/admin/users/:id" component={AdminUser} />
        </div>
    )
}

/**
 * AdimiUser
 */
const AdminUser: React.SFC<RouteComponentProps<{ id: string }>> = props => {
    // We use RouteComponentProps to get the id from the URL path and make this available in the props.
    // We can now use the id from the path to get the user from our adminUsersData array
    let user: IUser
    if (props.match.params.id) {
        const id: number = parseInt(props.match.params.id, 10)
        user = adminUsersData.filter(u => u.id === id)[0]
    } else {
        return null;
    }
    return (
        <div>
            <div>
                <b>Id: </b>
                <span>{user.id.toString()}</span>
            </div>
            <div>
                <b>Is Admin: </b>
                <span>{user.isAdmin.toString()}</span>
            </div>
        </div>
    )
};

export default AdminPage