import { styled } from "../../styles";
import * as Dialog from "@radix-ui/react-dialog";

export const ContainerHeader = styled("header", {
  padding: "2.5rem 0",
  width: "100%",
  maxWidth: 1100,
  marginBottom: "auto",
  display: "flex",
  justifyContent: "space-between",
});

export const CartContainer = styled("div", {
  width: "48px",
  height: "48px",
  background: "#202024",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

export const CartContent = styled(Dialog.Content, {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "30rem",
  background: "$gray800",
  padding: "3rem",
  paddingTop: "4.5rem",
  boxShadow: "-4px 8px 30px rgba(0,0,0, 0.8)",
  display: "flex",
  flexDirection: "column",

  h2: {
    fontWeight: 700,
    fontSize: "$lg",
    color: "$gray100",
    marginBottom: "2rem",
  },

  "> section": {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    flex: 1,
    overflowY: "auto",
  },
});

export const CloseCart = styled(Dialog.Close, {
  background: "none",
  border: "none",
  color: "$gray500",
  position: "absolute",
  top: "1.75rem",
  right: "1.75rem",
});

export const CartProduct = styled("div", {
  width: "100%",
  display: "flex",
  gap: "1.25rem",
  alignItems: "center",
  height: "5.8rem",
});

export const CartProductImage = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 0,
  height: "5.8rem",
  width: "6.3rem",
  background: "linear-gradient(100deg, #1ea483 0%, #7465d4 100%)",

  img: {
    objectFit: "cover",
  },
});

export const CartProductDetails = styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",

  p: {
    color: "$gray300",
    fontSize: "$md",
  },

  strong: {
    marginTop: 4,
    fontSize: "$md",
    fontWeight: 700,
  },

  button: {
    marginTop: "auto",
    width: "max-content",
    background: "none",
    color: "$green500",
    fontSize: "1rem",
    border: "none",
    fontWeight: 700,
  },
});

export const CartFooter = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "auto",

  button: {
    width: "100%",
    background: "$green500",
    color: "$white",
    fontSize: "$md",
    height: "4.3rem",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    transition: "background-color 0.5s",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    "&:not(:disabled):hover": {
      background: "$green300",
    },
  },
});

export const CartFooterDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginBottom: 55,

  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    p: {
      fontSize: "$md",
      color: "$gray300",
    },
    "&:last-child": {
      fontWeight: "bold",
      span: {
        fontSize: "$md",
      },
      p: {
        color: "$gray100",
        fontSize: "$xl",
      },
    },
  },
});
