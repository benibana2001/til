import * as React from 'react'
import { IProduct, products } from './ProductsData'
import { Link, RouteComponentProps, Route } from 'react-router-dom'

interface IState {
    products: IProduct[]
    search: string
}

class ProductsPage extends React.Component<RouteComponentProps, IState> {
    public constructor(props: RouteComponentProps) {
        super(props)
        this.state = {
            products: [],
            search: ""
        }
    }
    public componentDidMount() {
        this.setState({ products })
    }
    public static getDerivedStateFromProps(
        props: RouteComponentProps,
        state: IState
    ) {
        const searchParams = new URLSearchParams(props.location.search)
        const search = searchParams.get("search") || ""
        return {
            products: state.products,
            search
        }
    }
    public render() {
        return (
            <div className="page-container">
                <p>
                    ショップ「猫の宴」へようこそ！
                </p>
                <ul className="product-list">
                    {this.state.products.map(product => {
                        if (
                            !this.state.search ||
                            (this.state.search &&
                                product.name
                                    .toLocaleLowerCase()
                                    .indexOf(this.state.search.toLocaleLowerCase()) > -1)
                        ) {
                            return (
                                <li key={product.id} className="product-list-item">
                                    <Link to={`/products/${product.id}`}>
                                        {product.name}
                                    </Link>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        )
    }
}
export default ProductsPage