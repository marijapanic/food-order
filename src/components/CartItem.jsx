import { Component, useContext } from "react";

// export default function CartItem({ name, quantity, price, onIncrease, onDecrease }) {

//     return <li className="cart-item">
//         <p>{name} - {quantity} x {price}</p>
//         <p className="cart-item-actions">
//             <button onClick={onDecrease}>-</button>
//             <button>{quantity}</button>
//             <button onClick={onIncrease}>+</button>
//         </p>
//     </li>
// }


export default class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <li className="cart-item">
            <p>{this.props.name} - {this.props.quantity} x {this.props.price}</p>
            <p className="cart-item-actions">
                <button onClick={this.props.onDecrease}>-</button>
                <button>{this.props.quantity}</button>
                <button onClick={this.props.onIncrease}>+</button>
            </p>
        </li>
    }
}