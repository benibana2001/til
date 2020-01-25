import * as React from 'react'
import { IProduct, products } from './ProductsData'

interface IState {
    products: IProduct[]
}

class ProductsPage extends React.Component<{}, IState> {
    public constructor(props: {}) {
        super(props)
        this.state = {
            products: []
        }
    }
    public componentDidMount() {
        this.setState({ products })
    }
    public render() {
        return (
            <div className="page-container">
                <p>
                    ショップ「猫の宴」へようこそ！
                </p>
                <ul className="product-list">
                    {this.state.products.map(product => {
                        return (
                            <li key={product.id} className="product-list-item">
                                {product.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default ProductsPage