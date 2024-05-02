import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export function useGetCartContext()
{
    const cartCtx = useContext(CartContext);

    return cartCtx;
}

export function useGetUserProgressCtx()
{
    const userProgressCtx = useContext(UserProgressContext);

    return userProgressCtx;
}