import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";
import { GrAddCircle } from "react-icons/gr";

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();

  //  bagItems add kiya
  const bagItems = useSelector((store) => store.bag || []);

  const wishlistItems = useSelector((store) => store.wishlist || []);

  // quantity logic
  const bagItem = bagItems.find((b) => Number(b.id) === Number(item.id));
  const quantity = bagItem ? bagItem.quantity : 0;

  //  wishlist
  const isWishlisted = wishlistItems.some(
    (id) => Number(id) === Number(item.id),
  );

  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  const handleWishlist = () => {
    dispatch(wishlistActions.toggleWishlist(Number(item.id)));
  };

  return (
    <div className="item-container">
      {/* ❤️ Wishlist */}
      <button className="wishlist-btn" onClick={handleWishlist}>
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      {/* 🖼 Image */}
      <img className="item-image" src={item.image} alt={item.item_name} />

      {/* ⭐ Rating */}
      <div className="rating">
        {item.rating?.stars} ⭐ | {item.rating?.count}
      </div>

      {/* 🏷 Details */}
      <div className="company-name">{item.company}</div>
      <div className="item-name">{item.item_name}</div>

      {/* 💰 Price */}
      <div className="price">
        <span className="current-price">₹ {item.current_price}</span>
        <span className="original-price">₹ {item.original_price}</span>
        <span className="discount">({item.discount_percentage}% OFF)</span>
      </div>

      {/* 🛒 Bag Controls */}
      {quantity > 0 ? (
        <div>
          <button onClick={handleRemove}>-</button>
          <span>{quantity}</span>
          <button onClick={handleAddToBag}>+</button>
        </div>
      ) : (
        <button
          className="btn btn-add-bag btn-success"
          onClick={handleAddToBag}
        >
          <GrAddCircle /> Add to Bag
        </button>
      )}
    </div>
  );
};

export default HomeItem;
