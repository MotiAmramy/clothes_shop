import { styled } from "styled-components";
import { ProductItemData } from "../../hooks/useFetchProducts";
import Button from "../ui/Button/Button";
import useCartStore from "../../store/cartStore";
import { useAuthStore } from "../../store/logginStore";
import { useNavigate } from "react-router-dom";
import { useUiStore } from "../../store/uiStore";

const ProductContainer = styled.div`
  cursor: pointer;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  max-width: 20rem;
  justify-content: space-between;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 150px;
  border-radius: 5px;
`;

interface ProductItemProps {
  readonly data: ProductItemData;
}

const ProductItem = ({ data }: ProductItemProps) => {
  const { image, title, price, description } = data;
  const { addItem } = useCartStore()
  const { isLoggedIn } = useAuthStore()
  const navigate = useNavigate()
  const { openModal } = useUiStore()

  return (
    <ProductContainer onClick={() => openModal(data)}>
      <ProductImage src={image} />
      <h2>
        {title} {price}$
      </h2>
      <p>{description}</p>
      {isLoggedIn ? <Button onClick={(e) => {
        addItem(data)
        e.stopPropagation();
      }}>
        Add to cart
      </Button> : <Button onClick={(e) => {
        e.stopPropagation();
        navigate('/login')
      }}>
        Add to cart
      </Button>}
    </ProductContainer>
  );
};

export default ProductItem;
