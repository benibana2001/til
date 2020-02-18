import * as React from "react";
import "url-search-params-polyfill";

import { RouteComponentProps, Route } from 'react-router-dom'
import { Link } from "react-router-dom";
import { IProduct, products as productsData } from "./ProductsData";

// type Props = RouteComponentProps<{ search: string }>
interface IState {
    products: IProduct[];
    search: string;
}

class ProductsPage extends React.Component<RouteComponentProps, IState> {
    // We then need to parse that string to get our search query string parameter.
    //   So that, use the static getDerivedStateFromPropslife cycle method.
    //   https://ja.reactjs.org/docs/react-component.html#static-getderivedstatefromprops
    public static getDerivedStateFromProps(
        props: RouteComponentProps,
        state: IState
    ) {
        // For to do query search, we use URLSearchParams.
        //   https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams
        const searchParams = new URLSearchParams(props.location.search)
        const search = searchParams.get('search') || ''
        return {
            producut: state.products,
            search: search
        }
    }
    public constructor(props: RouteComponentProps) {
        super(props)
        this.state = {
            products: [],
            search: ""
        }
    }
    public componentDidMount() {
        this.setState({ products: productsData })
    }
    private strInclude = (a: string) => (b: string) => {
        return a.toLowerCase().indexOf(b.toLocaleLowerCase()) > -1 ? true : false
    }
    // If search params, check each product from productsData list to exist or not.
    //   If not search params, we express all productsData (= return true). 
    private existOnTheList = (product: IProduct): boolean => {
        const isSearching = this.state.search ? true : false
        const existItem = (product: IProduct): boolean => this.strInclude(product.name)(this.state.search) ? true : false
        return (!isSearching || (isSearching && existItem(product))) ? true : false
    }
    public render() {
        return (
            <div className="page-container">
                <p>Welcome to React Shop where you can get all your tools for ReactJS!</p>
                <ul className="product-list">
                    {this.state.products.map((product: IProduct) => {
                        if (this.existOnTheList(product)) {
                            return (
                                <li key={product.id} className="product-list-item">
                                    <Link to={`/products/${product.id}`}>{product.name}</Link></li>
                            )
                        } else return null;
                    })}
                </ul>
            </div>
        )
    }
}

export default ProductsPage

// const ProductsPage: React.SFC = () => {
//     const [products, setProducts] = React.useState(productsData)
//     const [search, setSearch] = React.useState("")
//     return (
//         <div className="page-container">
//             <p>Welcome to React Shop where you can get all your tools for ReactJS!</p>
//             <ul className="product-list">
//                 {console.log(products)}
//                 {products.map((product: IProduct) => (
//                     <li key={product.id} className="product-list-item">
//                         <Link to={`/products/${product.id}`}>{product.name}</Link></li>
//                 ))}
//             </ul>
//         </div>
//     )
// }