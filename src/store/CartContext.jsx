import { useReducer } from "react";
import { createContext } from "react";

export const CART_ACTIONS = {
    ADD: "ADD_ITEM",
    REMOVE: "REMOVE_ITEM",
    CLEAR: "CLEAR_CART"
}
const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
});

function cartReducer(state, action) {
    if (action.type === CART_ACTIONS.ADD) {
        const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const updatedItems = [...state.items];
        if (existingItemIndex > -1) {
            const existingItem = state.items[existingItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }

            updatedItems[existingItemIndex] = updatedItem;
        }
        else {
            updatedItems.push({
                ...action.item,
                quantity: 1
            });
        }

        return {
            ...state,
            items: updatedItems
        }
    }

    if (action.type === CART_ACTIONS.REMOVE) {
        const existingItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingItemIndex];
        const updatedItems = [...state.items];
        if (existingItem.quantity === 1) {
            updatedItems.splice(existingItemIndex, 1)
        }
        else if (existingItem.quantity > 1) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            }
            updatedItems[existingItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems
        }
    }

    if (action.type === CART_ACTIONS.CLEAR) {
        return {
            ...state,
            items: []
        };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }

    function addItem(item) {
        dispatchCartAction({ type: CART_ACTIONS.ADD, item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: CART_ACTIONS.REMOVE, id });
    }

    function clearCart(id) {
        dispatchCartAction({ type: CART_ACTIONS.CLEAR });
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;