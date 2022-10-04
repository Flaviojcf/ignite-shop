import Image from "next/future/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { HomeContainer, Product } from "../styles/pages/home";
import shirt1 from "/public/Shirt-1.png";
import shirt2 from "/public/Shirt-2.png";
import shirt3 from "/public/Shirt-3.png";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={shirt1} width={520} height={520} alt="" />
        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 79.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={shirt2} width={520} height={520} alt="" />
        <footer>
          <strong>Camiseta 2</strong>
          <span>R$ 79.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={shirt3} width={520} height={520} alt="" />
        <footer>
          <strong>Camiseta 3</strong>
          <span>R$ 79.90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
