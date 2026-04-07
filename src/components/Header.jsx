import { BsFillPersonFill } from "react-icons/bs";
import { FaFaceGrinHearts, FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";

const Header = () => {
  const dispatch = useDispatch();

  const bagItems = useSelector((state) => state.bag);
  const wishlistItems = useSelector((state) => state.wishlist);
  const user = useSelector((state) => state.auth.user);

  const totalQuantity = bagItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  return (
    <header>
      <div className="logo_container">
        <Link
          to="/"
          onClick={() => dispatch(itemsActions.filterByCategory("all"))}
        >
          <img
            className="myntra_home"
            src="images/myntra_logo.webp"
            alt="Myntra Home"
          />
        </Link>
      </div>

      {/* NAV */}
      <nav className="nav_bar">
        <a onClick={() => dispatch(itemsActions.filterByCategory("men"))}>
          Men
        </a>

        <a onClick={() => dispatch(itemsActions.filterByCategory("women"))}>
          Women
        </a>

        <a>Kids</a>

        <a onClick={() => dispatch(itemsActions.filterByCategory("all"))}>
          Home & Living
        </a>

        <a>Beauty</a>

        <a>
          Studio <sup>New</sup>
        </a>
      </nav>

      <div className="search_bar">
        <span className="material-symbols-outlined search_icon">search</span>
        <input
          className="search_input"
          placeholder="Search for products, brands and more"
        />
      </div>

      <div className="action_bar">
        <Link className="action_container" to="/auth">
          <BsFillPersonFill size={18} />
          <span className="action_name">
            {user ? user.name || user.mobile : "Profile"}
          </span>
        </Link>

        <Link className="action_container" to="/wishlist">
          <FaFaceGrinHearts size={18} />
          <span className="action_name">Wishlist</span>

          {wishlistItems.length > 0 && (
            <span className="wishlist-count">{wishlistItems.length}</span>
          )}
        </Link>

        <Link className="action_container" to="/bag">
          <FaBagShopping size={18} />
          <span className="action_name">Bag</span>

          {totalQuantity > 0 && (
            <span className="bag-item-count">{totalQuantity}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
