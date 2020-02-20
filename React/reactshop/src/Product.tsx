import * as React from "react"

import { IProduct } from "./ProductsData"
import Tabs from "./Tabs";
import withLoader from "./withLoader"

interface IProps {
    product?: IProduct
    inBasket: boolean
    onAddToBasket: () => void
}

// In our example, our Product component is a pure function and so unit-testing this is simply a case of checking that the output is correct for different inputs because there are no side-effects.
const Product: React.SFC<IProps> = props => {
    const product = props.product
    const handleAddClick = () => {
        props.onAddToBasket()
    }
    if (!product) return null
    return (
        <React.Fragment>
            <h1>{product.name}</h1>

            {/* Tabs */}
            {/* <Tabs headings={["Description", "Reviews"]} /> */}
            <Tabs>
                {/* heaing means the title which is viewed at head of each Tab */}
                <Tabs.Tab
                    name="Description" 
                    initialActive={true}
                    heading={() => <b>Description</b>}>
                        <p>{product.description}</p>
                </Tabs.Tab>

                <Tabs.Tab 
                    name="Reviews"
                    heading={()=> "Reviews"}>
                        <ul className="product-reviews">
                            {product.reviews.map(review => (
                                <li key={review.reviewer}>
                                    <i>"{review.comment}</i> - {review.reviewer}
                                </li>
                            ))}
                        </ul>
                </Tabs.Tab>
            </Tabs>

            {/* We use Intl.NumberFormat to format the product price as currency with a currency symbol. */}
            <p className="product-price">
                {new Intl.NumberFormat("en-US", {
                    currency: "USD",
                    style: "currency"
                }).format(product.price)}
            </p>
            {!props.inBasket && (
                <button onClick={handleAddClick}>Add to basket</button>
            )}
        </React.Fragment>)
}
export default withLoader(Product)