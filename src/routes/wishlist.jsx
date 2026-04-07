import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";

const Wishlist = () => {
  // direct selector
  const wishlistItems = useSelector((state) => state.wishlist);
  const items = useSelector((state) => state.items.allItems);

  // fast lookup using Set
  const wishlistSet = new Set(wishlistItems);

  const finalItems = items.filter((item) => wishlistSet.has(Number(item.id)));

  //safe price calc
  const totalPrice = finalItems.reduce(
    (total, item) => total + (item.current_price || 0),
    0,
  );

  const totalOriginalPrice = finalItems.reduce(
    (total, item) => total + (item.original_price || 0),
    0,
  );

  const savings = totalOriginalPrice - totalPrice;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Wishlist ❤️</h2>

      {/*  Summary */}
      {finalItems.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Total: ₹{totalPrice}</h3>
          <p>Original: ₹{totalOriginalPrice}</p>
          <p style={{ color: "green" }}>You Save: ₹{savings}</p>
        </div>
      )}

      {/*  Items */}
      {finalItems.length === 0 ? (
        <h3>No items in wishlist</h3>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {finalItems.map((item) => (
            <HomeItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
