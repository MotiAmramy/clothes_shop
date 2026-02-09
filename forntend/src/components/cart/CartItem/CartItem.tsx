import styled from "styled-components";

import { MdDelete } from "react-icons/md";
import Button from "../../ui/Button/Button";
import { ProductItemData } from "../../../hooks/useFetchProducts";
import useCartStore from "../../../store/cartStore";

const StyledCartItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  padding: 1rem;
  max-width: 16rem;
  box-shadow: 0 2px 3px #d3d3d3;
  background-color: #dcdadacc;
`;

const CartItemContent = styled.div`
  display: flex;
  gap: 1rem;
  background-color: #dcdadacc;
`;

const DeleteArea = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

interface CartItemProps {
  readonly item: ProductItemData;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeItem } = useCartStore();
  return (
    <StyledCartItem>
      <CartItemContent>
        <img src={item.image} style={{ width: "5rem" }} />
        <p>{item.title}</p>
      </CartItemContent>
      <DeleteArea>
        <Button
          onClick={() => removeItem(item._id)}
          style={{ fontSize: "30px", color: "#700d0d" }}
        >
          <MdDelete />
        </Button>
      </DeleteArea>
    </StyledCartItem>
  );
};

export default CartItem;
