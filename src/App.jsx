import { CartContextProvider } from "./store/CartContext.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx"
import { UserProgressProvider } from "./store/UserProgressContext.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header text="ReactFood"></Header>
        <Meals></Meals>
        <Cart></Cart>
        <Checkout></Checkout>
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
