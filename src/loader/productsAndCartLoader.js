import { getStoredCart } from "../fakedb/fakedb";

export const productsAndCartLoader = async () => {
    // get products 
    const porductsData = await fetch('http://localhost:5000/products');
    const { products } = await porductsData.json();


    // get carts 
    const storedCart = getStoredCart();
    const initialCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(product => product._id === id)
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }

    }
    return { products, initialCart }

}