import { createContext, ReactNode, useState } from "react";

export interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface CartContextData {
  cartItems: ProductProps[];
  addItemToCart: (product: ProductProps) => void;
  checkItemAlreadyExistInCart: (productId: string) => boolean;
  removeCartItem: (productId: string) => void;
  cartTotal:number;
}

interface CartContexProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartContextProvider({ children }: CartContexProviderProps) {
  const [cartItems, setCartItems] = useState<ProductProps[]>([]);

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice
  },0);

  function addItemToCart(product: ProductProps) {
    setCartItems((state) => [...state, product]);
  }

  function checkItemAlreadyExistInCart(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  function removeCartItem(productId: string) {
    setCartItems((state) => state.filter((item) => item.id !== productId));
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        checkItemAlreadyExistInCart,
        removeCartItem,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
