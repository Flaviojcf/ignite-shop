import Image from "next/future/image";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { Handbag, X } from "phosphor-react";
import {
  ContainerHeader,
  CartContainer,
  CartContent,
  CloseCart,
  CartProduct,
  CartProductImage,
  CartProductDetails,
  CartFooter,
  CartFooterDetails,
} from "./styles";
import logo from "/public/Logo.png";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import { useRouter } from "next/router";

export function Header() {
  const { pathname } = useRouter();
  const showHeaderCartButton = pathname !== "/success";

  const { cartItems, removeCartItem, cartTotal } = useCart();
  const cartQuantity = cartItems.length;
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const formattedCartTotalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  function handleRemoveItemInCart(id: string) {
    removeCartItem(id);
  }

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        products: cartItems,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert(err);
    }
  }
  function handleRedirectToHome() {
    window.location.href = "/";
  }

  return (
    <ContainerHeader>
      <Image
        src={logo}
        alt=""
        style={{ cursor: "pointer" }}
        onClick={handleRedirectToHome}
      />
      {showHeaderCartButton && (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <CartContainer>
              <Handbag size={32} style={{ position: "relative" }} />
            </CartContainer>
          </Dialog.Trigger>
          <Dialog.Portal>
            <CartContent>
              <CloseCart>
                <X size={24} weight="bold" />
              </CloseCart>
              <h2>Sacola de compras</h2>

              <section>
                {cartItems.length <= 0 && (
                  <p>Parece que seu carrinho está vazio : (</p>
                )}
                {cartItems.map((cartItem) => (
                  <CartProduct key={cartItem.id}>
                    <CartProductImage>
                      <Image
                        width={100}
                        height={93}
                        alt=""
                        src={cartItem.imageUrl}
                      />
                    </CartProductImage>
                    <CartProductDetails>
                      <p>{cartItem.name}</p>
                      <strong>{cartItem.price}</strong>
                      <button
                        onClick={() => handleRemoveItemInCart(cartItem.id)}
                      >
                        Remover
                      </button>
                    </CartProductDetails>
                  </CartProduct>
                ))}
              </section>

              <CartFooter>
                <CartFooterDetails>
                  <div>
                    <span>Quantidade</span>
                    <p>
                      {cartQuantity} {cartQuantity === 1 ? "item" : "itens"}
                    </p>
                  </div>
                  <div>
                    <span>Valor Total</span>
                    <p>{formattedCartTotalPrice}</p>
                  </div>
                </CartFooterDetails>
                <button
                  disabled={isCreatingCheckoutSession || cartQuantity === 0}
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </button>
              </CartFooter>
            </CartContent>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </ContainerHeader>
  );
}
