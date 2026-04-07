import { useSelector } from "react-redux";

const BagSummary = () => {
  const bagItems = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);

  const CONVENIENCE_FEES = 99;

  let totalItems = 0;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItems.forEach((bagItem) => {
    const product = items.find((item) => item.id === bagItem.id);

    if (!product) return; // safety

    totalItems += bagItem.quantity;

    totalMRP += product.original_price * bagItem.quantity;

    (product.original_price - product.current_price) * bagItem.quantity;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({totalItems} Items)</div>

        <div className="price-item">
          <span>Total MRP</span>
          <span>₹{totalMRP}</span>
        </div>

        <div className="price-item">
          <span>Discount on MRP</span>
          <span>-₹{totalDiscount}</span>
        </div>

        <div className="price-item">
          <span>Convenience Fee</span>
          <span>₹{CONVENIENCE_FEES}</span>
        </div>

        <hr />

        <div className="price-footer">
          <span>Total Amount</span>
          <span>₹{finalPayment}</span>
        </div>
      </div>

      <button className="btn-place-order">PLACE ORDER</button>
    </div>
  );
};

export default BagSummary;
