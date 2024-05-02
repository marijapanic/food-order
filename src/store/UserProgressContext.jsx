import { createContext, useState } from "react";

export const USER_PROGRESS_ACTIONS = {
    CART: "cart",
    CHECKOUT: "checkout"
}

const UserProgressContext = createContext({
    progress: "",
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { }
});

export function UserProgressProvider({ children }) {
    const [userProgress, setUserProgress] = useState("");

    function showCart() {
        setUserProgress(USER_PROGRESS_ACTIONS.CART);
    }

    function hideCart() {
        setUserProgress("");
    }

    function showCheckout() {
        setUserProgress(USER_PROGRESS_ACTIONS.CHECKOUT);
    }

    function hideCheckout() {
        setUserProgress("");
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;