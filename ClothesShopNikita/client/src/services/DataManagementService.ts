import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import {LocalStorageKeysEnum} from "../assets/constants/localStorageKeys.enum";
import {IProduct} from "../assets/interfaces/IProduct";

export const DataManagementService = {
    get products() {
        return (reactLocalStorage.getObject(LocalStorageKeysEnum.allProducts) as IProduct[]);
    },

    get cart(): {id: string, quantity: number}[] {
        const cart = (reactLocalStorage.getObject(LocalStorageKeysEnum.shoppingCart) as {id: string, quantity: number}[]);
        return cart.length ? cart : [];
    },

    addToCart: (id: string, quantity: number = 1) => {
        const cart = (reactLocalStorage.getObject(LocalStorageKeysEnum.shoppingCart) as {id: string, quantity: number}[]);
        const products = (reactLocalStorage.getObject(LocalStorageKeysEnum.allProducts) as IProduct[]);
        const quantityOfItemsInStockObj = products.find((product => product.id === id));

        if(quantity <= 0) {
            alert("Wrong quantity!");
            return;
        }

        if(!quantityOfItemsInStockObj || quantityOfItemsInStockObj.inStock === 0) {
            alert("Out of stock");
            return;
        }
        // if cart is not empty
        if(cart && cart.length) {
            // check if product is in the cart already if it is there, change quantity
            const isInCartObject = cart.find((cartObject: {id: string, quantity: number}) => cartObject.id === id);
            if(isInCartObject) {
                isInCartObject.quantity++;
                quantityOfItemsInStockObj.inStock--;
                reactLocalStorage.setObject(LocalStorageKeysEnum.shoppingCart, [...cart]);
                reactLocalStorage.setObject(LocalStorageKeysEnum.allProducts, [...products]);
                return;
            } else {
                // if it is not there add it to the cart
                quantityOfItemsInStockObj.inStock--;
                reactLocalStorage.setObject(LocalStorageKeysEnum.allProducts, [...products]);
                reactLocalStorage.setObject(LocalStorageKeysEnum.shoppingCart, [...cart, {id, quantity}]);
                return;
            }
        } else {
            quantityOfItemsInStockObj.inStock--;
            reactLocalStorage.setObject(LocalStorageKeysEnum.allProducts, [...products]);
            reactLocalStorage.setObject(LocalStorageKeysEnum.shoppingCart, [{id, quantity}]);
            return;
        }

    },

    getAllProducts: async (cat?: string) => {
        axios.get(cat ? `https://localhost:7227/api/Shop=${cat}` : "https://localhost:7227/api/Shop")
        .then((items) => {
            reactLocalStorage.setObject(LocalStorageKeysEnum.allProducts, items.data);
        });
    },

    deleteFromTheCart: (id: string, all = false) => {
        const cart = (reactLocalStorage.getObject(LocalStorageKeysEnum.shoppingCart) as {id: string, quantity: number}[]);
        const products = (reactLocalStorage.getObject(LocalStorageKeysEnum.allProducts) as IProduct[]);
        const objectToDelete = cart.find(item => item.id === id);
        const productTorenewQuantity = products.find(item => item.id === id);
        if(!objectToDelete) {
            alert("There is nothing to delete!");
        }
        if(objectToDelete && objectToDelete.quantity > 1 && !all) {
            objectToDelete!.quantity--;
            productTorenewQuantity!.inStock++;
            reactLocalStorage.setObject(LocalStorageKeysEnum.shoppingCart, [...cart]);
            reactLocalStorage.setObject(LocalStorageKeysEnum.allProducts, [...products]);
        } else {
            const newCart = cart.filter(item => item.id !== id);
            productTorenewQuantity!.inStock++;
            reactLocalStorage.setObject(LocalStorageKeysEnum.shoppingCart, [...newCart]);
            reactLocalStorage.setObject(LocalStorageKeysEnum.allProducts, [...products]);
        }
    },

    buy: async (cartItems: {id: string, quantity: number}[]) => {
        const products = (reactLocalStorage.getObject(LocalStorageKeysEnum.allProducts) as IProduct[]);
        cartItems.forEach(cartItem => {
            const patchingObject = products.find(patchObject => patchObject.id === cartItem.id);
            const pathObject = {inStock: patchingObject!.inStock - cartItem.quantity > 0 ? patchingObject!.inStock - cartItem.quantity : 0};

            axios.patch("https://localhost:7227/api/Shop/" + cartItem.id, pathObject).catch((err) => {
                alert(err.message);
            })
        });
        alert("Thank you for your purchase");
        reactLocalStorage.setObject(LocalStorageKeysEnum.shoppingCart, []);
        reactLocalStorage.setObject(LocalStorageKeysEnum.allProducts, []);
    }
}
