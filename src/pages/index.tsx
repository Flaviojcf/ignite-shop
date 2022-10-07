import Image from "next/future/image";
import useEmblaCarousel from "embla-carousel-react";
import { GetStaticProps } from "next";
import Head from "next/head";

import { HomeContainer, Product, SliderContainer } from "../styles/pages/home";

import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import { useCart } from "../hooks/useCart";
import { ProductProps } from "../context/CartContext";
import { MouseEvent, useEffect, useState } from "react";
import { ProductSkeleton } from "../components/ProductSkeleton/ProductSkeleton";

interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timeOut);
  }, []);
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const { addItemToCart, checkItemAlreadyExistInCart } = useCart();

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: ProductProps
  ) {
    e.preventDefault();
    addItemToCart(product);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <div style={{ overflow: "hidden", width: "100%" }}>
        <HomeContainer>
          <div className="embla" ref={emblaRef}>
            <SliderContainer className="embla__container container">
              {isLoading ? (
                <>
                  <ProductSkeleton className="embla__slide" />
                  <ProductSkeleton className="embla__slide" />
                  <ProductSkeleton className="embla__slide" />
                </>
              ) : (
                <>
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      prefetch={false}
                      passHref
                    >
                      <Product className="embla__slide">
                        <Image
                          src={product.imageUrl}
                          width={520}
                          height={480}
                          alt=""
                          placeholder="blur"
                          blurDataURL={product.imageUrl}
                        />

                        <footer>
                          <div>
                            <strong>{product.name}</strong>
                            <span>{product.price}</span>
                          </div>
                          <button
                            color="green"
                            disabled={checkItemAlreadyExistInCart(product.id)}
                            onClick={(e) => handleAddToCart(e, product)}
                          >
                            <Handbag size={32} style={{color:"white"}} />
                          </button>
                        </footer>
                      </Product>
                    </Link>
                  ))}
                </>
              )}
            </SliderContainer>
          </div>
        </HomeContainer>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
    active: true,
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
