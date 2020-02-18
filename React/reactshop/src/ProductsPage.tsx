import * as React from "react";
import { IProduct, products as productsData } from "./ProductsData";

const ProductsPage: React.SFC = () => {
    const [products, setProducts] = React.useState(productsData)
    // React.useEffect(() => {
    // })
    return (
        <div className="page-container">
            <p>Welcome to React Shop where you can get all your tools for ReactJS!</p>
            <ul className="product-list">
                {console.log(products)}
                {products.map((product: IProduct) => (
                    <li key={product.id} className="product-list-item">{product.name}</li>
                ))}
            </ul>
        </div>
    )
}
export default ProductsPage