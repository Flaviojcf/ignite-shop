import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { useCart } from "../../hooks/useCart";
import { ProductProps } from "../../context/CartContext";

interface ProductPropsId {
  product: ProductProps;
}

export default function Product({ product }: ProductPropsId) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const { isFallback } = useRouter();
  const { addItemToCart, checkItemAlreadyExistInCart } = useCart();

  if (isFallback) {
    return <p>LOADING...</p>;
  }

  const itemAlreadyInCart = checkItemAlreadyExistInCart(product.id);

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button
            disabled={itemAlreadyInCart}
            onClick={() => addItemToCart(product)}
          >
            {itemAlreadyInCart
              ? "Produto já existente no carrinho"
              : "Adicionar ao carrinho"}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MYKuyva6EdYwwd" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params.id);
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1,
  };
};
