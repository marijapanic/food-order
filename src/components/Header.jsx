import { Component, useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

// export default function Header(props)
// {
//     const cartCtx = useContext(CartContext);
//     const userProgress = useContext(UserProgressContext);

//     function handleShowCart()
//     {
//         userProgress.showCart();
//     }

//     const totalCartItems = cartCtx
//     .items
//     .reduce(
//         (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
//         0
//     );
//     return (
//         <header id="main-header">
//             <div id="title">
//                 <img src={logoImg}></img>
//                 <h1>{props.text}</h1>
//             </div>
//             <nav>
//                 <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
//             </nav>
//         </header>
//     );
// }

export default class Header extends Component {
    static contextType = CartContext;
    constructor(props) {
        super(props);
    }

    get totalCartItems() {
        return this.context
            .items
            .reduce(
                (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
                0
            );
    }
    render() {
        return (
            <header id="main-header">
                <div id="title">
                    <img src={logoImg}></img>
                    <h1>{this.props.text}</h1>
                </div>
                <UserProgressContext.Consumer>
                    {userCtx => (
                        <nav>
                            <Button textOnly onClick={userCtx.showCart}>Cart({this.totalCartItems})</Button>
                        </nav>
                    )}
                </UserProgressContext.Consumer>
            </header>
        );
    }
}