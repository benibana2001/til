import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IProduct, products } from './ProductsData'
import ProductsPage from './ProductsPage'

type Props = RouteComponentProps<{ id: string }>

interface IState {
    product?: IProduct
    added: boolean
}

class ProductPage extends React.Component<Props, IState> {
    public constructor(props: Props) {
        super(props)
        this.state = {
            added: false
        }
    }
    public componentDidMount() {
        // パラメータからIDを取得
        if (this.props.match.params.id) {
            const id: number = parseInt(this.props.match.params.id, 10)
            const product = products.filter(p => p.id === id)[0]

            this.setState({ product })
        }
    }
    private handleAddClick = () => {
        this.setState({ added: true })
    }
    public render() {
        const product = this.state.product
        return (
            <div className="page-container">
                {product ? (
                    <React.Fragment>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <p className="product-price">
                            {product.price}
                        </p>
                        {!this.state.added && (
                            <button onClick={this.handleAddClick}>Add to basket</button>
                        )}
                    </React.Fragment>
                ) : (
                        <p>Product not found!</p>
                    )}
            </div>

        )
    }
}
export default ProductPage