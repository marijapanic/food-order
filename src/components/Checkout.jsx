import { Component, useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext, { USER_PROGRESS_ACTIONS } from "../store/UserProgressContext";
import useHttp, { DOMAIN } from "../api/agent.js";
import Error from "./UI/Error.jsx";

const requestConfig = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    }
}
// export default function Checkout() {
//     const cartContext = useContext(CartContext);
//     const userContext = useContext(UserProgressContext);
//     const { data, isLoading, error, sendRequest, clearData } = useHttp(`${DOMAIN}/orders`, requestConfig);

//     const cartTotal = cartContext
//         .items
//         .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

//     function handleClose() {
//         userContext.hideCheckout();
//     }

//     function handleFinish() {
//         userContext.hideCheckout();
//         cartContext.clearCart();
//         clearData();
//     }

//     function handleOpenCheckout() {
//         userContext.showCheckout();
//     }

//     function handleSubmit(event) {
//         event.preventDefault();

//         const formData = new FormData(event.target);
//         const customerData = Object.fromEntries(formData.entries());

//         sendRequest(JSON.stringify({
//             order: {
//                 items: cartContext.items,
//                 customer: customerData
//             }
//         }));
//     }

//     let actions = (
//         <>
//             <Button textOnly type="button" onClick={handleClose}>Close</Button>
//             <Button onClick={handleOpenCheckout}>Submit Order</Button>
//         </>
//     );

//     if (isLoading) {
//         actions = <span>Sending order data</span>
//     }

//     if (data && !error) {
//         return <Modal
//             open={userContext.progress == USER_PROGRESS_ACTIONS.CHECKOUT}
//             onClose={userContext.handleFinish}>
//             <h2>Success</h2>
//             <p>Your order was submitted successfully</p>
//             <p className="modal-actions">
//                 <Button onClick={handleFinish}>Okay</Button>
//             </p>
//         </Modal>
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

//                 {error && <Error title="Failed to submit order" message={error}></Error>}
//                 <p className="modal-actions">
//                     {actions}
//                 </p>
//             </form>
//         </Modal>
//     );
// }

export default class Checkout extends Component {
    static contextType = CartContext;

    constructor() {
        super();
        this.state = {
            data: null,
            isLoading: false,
            error: null
        }
    }

    get totalPrice() {
        return this.context
            .items
            .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);
    }

    async submitOrder(orderParams) {
        this.setState({ isLoading: true, error: null });
        const fetchedResponse = await fetch(`${DOMAIN}/orderss`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderParams)
        });

        if (!fetchedResponse.ok) {
            this.setState({
                isLoading: false,
                error: `Failed to fetch. Status: ${fetchedResponse.status}`
            });
            return;
        }

        const response = await fetchedResponse.json();

        this.setState({
            isLoading: false,
            data: response
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const customerData = Object.fromEntries(formData.entries());

        this.submitOrder({
            order: {
                items: this.context.items,
                customer: customerData
            }
        });
    }

    handleFinish(hideCheckout) {
        hideCheckout();
        this.context.clearCart();
        this.setState({ data: null })
    }

    render() {

        if (this.state.data && !this.state.error) {
            return (
                <UserProgressContext.Consumer>
                    {userProgressContext => (
                        <Modal
                            open={userProgressContext.progress == USER_PROGRESS_ACTIONS.CHECKOUT}
                            onClose={this.handleFinish.bind(this, userProgressContext.hideCheckout)}>
                            <h2>Success</h2>
                            <p>Your order was submitted successfully</p>
                            <p className="modal-actions">
                                <Button onClick={this.handleFinish.bind(this, userProgressContext.hideCheckout)}>Okay</Button>
                            </p>
                        </Modal>
                    )}
                </UserProgressContext.Consumer>
            )
        }
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
                            {this.state.error && <Error title="Failed to submit order" message={this.state.error}></Error>}
                            <p className="modal-actions">
                                {this.state.isLoading ? <span>Sending order data</span> :
                                    <>
                                        <Button textOnly type="button" onClick={userProgressContext.hideCheckout}>Close</Button>
                                        <Button onClick={userProgressContext.showCheckout}>Submit Order</Button>
                                    </>
                                }
                            </p>
                        </form>
                    </Modal>
                )}
            </UserProgressContext.Consumer>
        );
    }
}