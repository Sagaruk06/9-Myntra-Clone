import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";

const BagItem = ({ item, quantity }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleDecrease = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="bag-item-container">
      <img src={item.image} alt={item.item_name} className="bag-item-img" />

      <div className="bag-item-details">
        <h3>{item.company}</h3>
        <p>{item.item_name}</p>
        <p>₹{item.current_price}</p>

        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      </div>
    </div>
  );
};

export default BagItem;
