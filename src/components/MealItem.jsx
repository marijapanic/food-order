import { Component, useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { DOMAIN } from "../api/agent";

// export default function MealItem(props)
// {
//     const cartCtx = useContext(CartContext);
//     function handleAddMealToCart()
//     {
//         cartCtx.addItem(props);
//     }

//     return (
//         <li className="meal-item">
//             <article>
//                 <img src={`${DOMAIN}/${imgSrc}`} alt={props.name}></img>
//                 <div>
//                     <h3>{props.name}</h3>
//                     <p className="meal-item-price">{currencyFormatter.format(props.price)}</p>
//                     <p className="meal-item-decription">{props.decription}</p>
//                 </div>
//                 <p className="meal-item-actions">
//                     <Button onClick={handleAddMealToCart}>Add to Cart</Button>
//                 </p>
//             </article>
//         </li>
//     )
// }


export default class MealItem extends Component
{
    static contextType = CartContext;
    constructor(props)
    {
        super(props);
    }

    handleAddMealToCart()
    {
        this.context.addItem(this.props);
    }

    render()
    {
        return (
            <li className="meal-item">
                <article>
                    <img src={`${DOMAIN}/${this.props.image}`} alt={this.props.name}></img>
                    <div>
                        <h3>{this.props.name}</h3>
                        <p className="meal-item-price">{currencyFormatter.format(this.props.price)}</p>
                        <p className="meal-item-decription">{this.props.decription}</p>
                    </div>
                    <p className="meal-item-actions">
                        <Button onClick={this.handleAddMealToCart.bind(this)}>Add to Cart</Button>
                    </p>
                </article>
            </li>
        )
    }
}