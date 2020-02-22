import * as React from "react"
import { Prompt, RouteComponentProps } from "react-router-dom"

import { getProduct, IProduct } from "./ProductsData"
import Product from "./Product"

// RouteComponentProps only allows us to have Route parameters of type string or undefined.
type Props = RouteComponentProps<{ id: string }>

interface IState {
    product?: IProduct
    added: boolean
    loading: boolean
}

class ProductPage extends React.Component<Props, IState> {
    public constructor(props: Props) {
        super(props)
        this.state = {
            added: false,
            loading: true
        }
    }
    public async componentDidMount() {
        if (this.props.match.params.id) {
            // RouteComponentProps gives us a match object, containing a params object, containing our id route parameter. 
            const id: number = parseInt(this.props.match.params.id, 10)
            const product = await getProduct(id)
            // const product = products.filter(p => p.id === id)[0]
            if(product !== null) this.setState({ product: product, loading: false })
        }
    }
    private handleAddClick = () => {
        this.setState({ added: true })
    }
    private navAwayMessage = () =>
        "Are you sure you leave without buying this product?";
    public render() {
        // To save a few keystorokes
        const product = this.state.product
        return (
            <div className="page-container">
                {/* The Prompt component invokes a confirmation dialog during navigation when a certain condition is met.  */}
                <Prompt when={!this.state.added} message={this.navAwayMessage} />
                {(product || this.state.loading) ? (
                    <Product
                        // loading={this.state.loading}
                        product={product}
                        inBasket={this.state.added}
                        onAddToBasket={this.handleAddClick}
                    />
                ) : <p>Product not found!</p>}
            </div>
        )
    }
}
export default ProductPage