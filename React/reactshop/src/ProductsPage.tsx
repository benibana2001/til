import * as React from "react";
import { connect } from "react-redux";
import "url-search-params-polyfill";

import { IApplicationState } from "./Store";
import { getProducts } from "./ProductsActions";

import { RouteComponentProps } from 'react-router-dom'
import { Link } from "react-router-dom";
// import { IProduct, products as productsData, getProduct } from "./ProductsData";
import { IProduct, getProduct } from "./ProductsData";

// type Props = RouteComponentProps<{ search: string }>
interface IState {
    products: IProduct[];
    search: string;
}

interface IProps extends RouteComponentProps {
    getProducts: typeof getProducts
    loading: boolean
    products: IProduct[]
}

class ProductsPage extends React.Component<IProps> {
    // We then need to parse that string to get our search query string parameter.
    //   So that, use the static getDerivedStateFromPropslife cycle method.
    //   https://ja.reactjs.org/docs/react-component.html#static-getderivedstatefromprops
    public constructor(props: IProps) {
        super(props)
        // this.state = {
        //     products: [],
        //     search: ""
        // }
    }
    public async componentDidMount() {
        // this.setState({ products: productsData })
        this.props.getProducts()
    }
    // private strInclude = (a: string) => (b: string) => {
    //     return a.toLowerCase().indexOf(b.toLocaleLowerCase()) > -1 ? true : false
    // }
    // If search params, check each product from productsData list to exist or not.
    //   If not search params, we express all productsData (= return true). 
    // private existOnTheList = (product: IProduct): boolean => {
    //     const isSearching = this.state.search ? true : false
    //     const existItem = (product: IProduct): boolean => this.strInclude(product.name)(this.state.search) ? true : false
    //     return (!isSearching || (isSearching && existItem(product))) ? true : false
    // }
    public render() {
        const searchParams = new URLSearchParams(this.props.location.search)
        const search = searchParams.get('search') || ''
        return (
            <div className="page-container">
                <p>Welcome to React Shop where you can get all your tools for ReactJS!</p>
                <ul className="product-list">
                    {this.props.products.map((product: IProduct) => {
                        // if (this.existOnTheList(product)) {
                        if (!search || (search && product.name.toLowerCase().indexOf(search.toLowerCase())) > -1) {
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

const mapStateToProps = (store: IApplicationState) => {
    return {
        loading: store.products.productsLoading,
        products: store.products.products
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsPage)

// export default ProductsPage

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