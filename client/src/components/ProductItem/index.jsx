import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { addToCart } from "../../store/slices/cartSlice";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);

  const addToCartHandler = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === item._id);
    
    if (itemInCart) {
      dispatch(addToCart({
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      }));
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(addToCart({ ...item, purchaseQuantity: 1 }));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${item._id}`}>
        <img alt={item.name} src={`/images/${item.image}`} />
        <p>{item.name}</p>
      </Link>
      <div>
        <div>{item.quantity} in stock</div>
        <span>${item.price}</span>
      </div>
      <button onClick={addToCartHandler}>Add to cart</button>
    </div>
  );
}

export default ProductItem;