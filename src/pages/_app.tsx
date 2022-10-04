import { AppProps } from "next/app";
import Image from "next/future/image";
import { globalStyles } from "../styles/globalStyles";
import { Container, Header } from "../styles/pages/app";
import logo from "/public/Logo.png";
globalStyles();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logo} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
