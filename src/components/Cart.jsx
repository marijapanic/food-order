import { Component, useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import UserProgressContext, { USER_PROGRESS_ACTIONS, UserProgressProvider } from "../store/UserProgressContext";
import CartItem from "./CartItem";

// export default function Cart() {
//     const cartItemsContext = useContext(CartContext);
//     const userProgress = useContext(UserProgressContext);

//     const cartTotal = cartItemsContext
//         .items
//         .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

//     return <Modal className="cart" open={userProgress.progress == USER_PROGRESS_ACTIONS.CART}>
//         <h2>Your cart</h2>
//         <ul>
//             {cartItemsContext.items.map(item =>
//                 <CartItem
//                 key={item.id}
//                 name={item.name}
//                 quantity={item.quantity}
//                 price={item.price}
//                 onIncrease={() => cartItemsContext.addItem(item)}
//                 onDecrease={() => cartItemsContext.removeItem(item.id)}
//             >
//             </CartItem>
//         )}
//         </ul>
//         <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
//         <p className="modal-actions">
//             <Button textOnly>Close</Button>
//             <Button>Go to checkout</Button>
//         </p>
//     </Modal>
// }

export default class Cart extends Component {
    static contextType = CartContext;

    get totalPrice() {
        return this.context
            .items
            .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);
    }
    render() {
        return <UserProgressContext.Consumer>
            {userProgressContext => (
                <Modal className="cart" open={userProgressContext.progress == USER_PROGRESS_ACTIONS.CART}>
                    <h2>Your cart</h2>
                    <ul>
                        {this.context.items.map(item =>
                            <CartItem
                                key={item.id}
                                name={item.name}
                                quantity={item.quantity}
                                price={item.price}
                                onIncrease={() => this.context.addItem(item)}
                                onDecrease={() => this.context.removeItem(item.id)}
                            >
                            </CartItem>
                        )}
                    </ul>
                    <p className="cart-total">{currencyFormatter.format(this.totalPrice)}</p>
                    <p className="modal-actions">
                        <Button textOnly onClick={userProgressContext.hideCart}>Close</Button>
                        <Button onClick={userProgressContext.showCheckout}>Go to checkout</Button>
                    </p>
                </Modal>
            )}
        </UserProgressContext.Consumer>
    }
}