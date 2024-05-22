import { Component, useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext, { USER_PROGRESS_ACTIONS } from "../store/UserProgressContext";
import { SubmitOrder } from "../api/agent.js";

// export default function Checkout() {
//     const cartContext = useContext(CartContext);
//     const userContext = useContext(UserProgressContext);

//     const cartTotal = cartContext
//         .items
//         .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

//     function handleClose() {
//         userContext.hideCheckout();
//     }

//     function handleOpenCheckout() {
//         userContext.showCheckout();
//     }

//     function handleSubmit(event) {
//         event.preventDefault();

//         const formData = new FormData(event.target);
//         const customerData = Object.fromEntries(formData.entries());

//         SubmitOrder({
//             order: {
//                 items: cartContext.items,
//                 customer: customerData
//             }
//         });
//     }
//     return (
//         <Modal
//             open={userContext.progress == USER_PROGRESS_ACTIONS.CHECKOUT}
//             onClose={userContext.hideCheckout}>
//             <form onSubmit={handleSubmit}>
//                 <h2>Checkout</h2>
//                 <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

//                 <Input label="Full Name" type="text" id="name"></Input>
//                 <Input label="Email Adress" type="email" id="email"></Input>
//                 <Input label="Street" type="text" id="street"></Input>
//                 <div className="control-row">
//                     <Input label="Postal Code" type="text" id="postal-code"></Input>
//                     <Input label="City" type="text" id="city"></Input>
//                 </div>

//                 <p className="modal-actions">
//                     <Button textOnly type="button" onClick={handleClose}>Close</Button>
//                     <Button onClick={handleOpenCheckout}>Submit Order</Button>
//                 </p>
//             </form>
//         </Modal>
//     );
// }

export default class Checkout extends Component {
    static contextType = CartContext;

    get totalPrice() {
        return this.context
            .items
            .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const customerData = Object.fromEntries(formData.entries());

        SubmitOrder({
            order: {
                items: this.context.items,
                customer: customerData
            }
        });
    }

    render() {
        return (
            <UserProgressContext.Consumer>
                {userProgressContext => (
                    <Modal
                        open={userProgressContext.progress == USER_PROGRESS_ACTIONS.CHECKOUT}
                        onClose={userProgressContext.hideCheckout}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <h2>Checkout</h2>
                            <p>Total Amount: {currencyFormatter.format(this.totalPrice)}</p>

                            <Input label="Full Name" type="text" id="name"></Input>
                            <Input label="Email Adress" type="email" id="email"></Input>
                            <Input label="Street" type="text" id="street"></Input>
                            <div className="control-row">
                                <Input label="Postal Code" type="text" id="postal-code"></Input>
                                <Input label="City" type="text" id="city"></Input>
                            </div>

                            <p className="modal-actions">
                                <Button textOnly type="button" onClick={userProgressContext.hideCheckout}>Close</Button>
                                <Button onClick={userProgressContext.showCheckout}>Submit Order</Button>
                            </p>
                        </form>
                    </Modal>
                )}
            </UserProgressContext.Consumer>
        );
    }
}