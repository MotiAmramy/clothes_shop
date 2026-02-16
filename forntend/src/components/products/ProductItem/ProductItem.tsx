import { styled } from "styled-components";
import { toast } from "react-toastify";
import Button from "../../ui/Button/Button";
import { ProductItemData } from "../../../hooks/useFetchProducts";
import useCartStore from "../../../store/cartStore";
import { useAuthStore } from "../../../store/logginStore";
import { useUiStore } from "../../../store/uiStore";
import { useNavigate } from "react-router-dom";

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
  background-color: #dcdadacc
`;
const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
      <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '5px' }}>
        <ImageContainer>
          <ProductImage src={image} />
        </ImageContainer>
      </div>
      <h2 style={{ margin: '0' }}>
        {title}
      </h2>
      <h2 style={{ margin: '0', color: '#6C5B7B' }}>
        {price}$
      </h2>
      <p style={{ margin: '0' }}>{description}</p>
      {isLoggedIn ? <Button style={{ backgroundColor: "#fbc0bbff" }} onClick={(e) => {
        addItem(data)
        toast.success("Added to cart!")
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
