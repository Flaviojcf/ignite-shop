import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  maxWidth: "90rem",
  marginLeft: "auto",
  minHeight: 656,
  marginBottom: "auto",
});

export const SliderContainer = styled("div", {
  display: "flex",
  gap: "3rem",
  marginBottom: "4rem",
  ".embla__slide": {
    minWidth: "43.5rem",
  },
});

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  width: "100%",
  minHeight: 656,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",

    borderRadius: 6,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(0, 0, 0, 0.6)",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    strong: {
      fontSize: "$lg",
      color: "$gray100",
    },

    span: {
      fontSize: "$xl",
      fontWeight: "bold",
      color: "$green300",
    },
    "div:first-Child": {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
    },
    "button:last-Child": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      border: 'none',
      padding: "12px",
      gap: "12px",
      width: "56px",
      height: "56px",
      background: "#00875F",
      borderRadius: "6px",
      transition: "background-color 0.5s",

      "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
      },
      "&:not(:disabled):hover": {
        background: "$green300",
      },
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
});
