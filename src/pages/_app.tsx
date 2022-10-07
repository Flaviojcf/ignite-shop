import { AppProps } from "next/app";
import { Header } from "../components/Header/Header";
import { CartContextProvider } from "../context/CartContext";

import { globalStyles } from "../styles/globalStyles";
import { Container } from "../styles/pages/app";

globalStyles();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  );
}

export default MyApp;
