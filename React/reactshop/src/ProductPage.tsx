import * as React from "react"
import { Prompt, RouteComponentProps } from "react-router-dom"

import { IProduct, products } from "./ProductsData"
import Product  from "./Product"

// RouteComponentProps only allows us to have Route parameters of type string or undefined.
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
        if (this.props.match.params.id) {
            // RouteComponentProps gives us a match object, containing a params object, containing our id route parameter. 
            const id: number = parseInt(this.props.match.params.id, 10)
            console.log(`id: ${id}`)
            const product = products.filter(p => p.id === id)[0]

            this.setState({ product })
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
                {product ? (
                    <Product
                        product={product}
                        inBasket={this.state.added}
                        onAddToBasket={this.handleAddClick}
                    />
                    // <React.Fragment>
                    //     <h1>{product.name}</h1>
                    //     <p>{product.description}</p>
                    //     {/* We use Intl.NumberFormat to format the product price as currency with a currency symbol. */}
                    //     <p className="product-price">
                    //         {new Intl.NumberFormat("en-US", {
                    //             currency: "USD",
                    //             style: "currency"
                    //         }).format(product.price)}
                    //     </p>
                    //     {!this.state.added && (
                    //         <button onClick={this.handleAddClick}>Add to basket</button>
                    //     )}
                    // </React.Fragment>
                ) : <p>Product not found!</p>}
            </div>
        )
    }
}
export default ProductPage