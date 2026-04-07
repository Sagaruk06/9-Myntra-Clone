import { useSelector, useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";

const Bag = () => {
  const dispatch = useDispatch();

  const items = useSelector((store) => store.items.allItems);
  const bag = useSelector((store) => store.bag);

  const bagItems = bag
    .map((bagItem) => {
      const product = items.find(
        (item) => Number(item.id) === Number(bagItem.id),
      );

      if (!product) return null;

      return {
        ...product,
        quantity: bagItem.quantity,
      };
    })
    .filter(Boolean);

  const totalPrice = bagItems.reduce(
    (total, item) => total + item.current_price * item.quantity,
    0,
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>My Bag</h2>

      {bagItems.length === 0 ? (
        <p>No items in bag</p>
      ) : (
        <>
          {bagItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "20px",
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                alignItems: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.item_name}
                style={{
                  width: "100px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />

              <div>
                <h4>{item.item_name}</h4>

                <p>
                  ₹{item.current_price} × {item.quantity} =
                  <strong> ₹{item.current_price * item.quantity}</strong>
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => dispatch(bagActions.addToBag(item.id))}
                  >
                    +
                  </button>

                  <span>Qty: {item.quantity}</span>

                  <button
                    onClick={() => dispatch(bagActions.removeFromBag(item.id))}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}

          <h3>Total: ₹{totalPrice}</h3>
        </>
      )}
    </div>
  );
};

export default Bag;
