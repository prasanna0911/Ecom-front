import WishCard from "../Card/Wishlist/WishCard";
import "./index.css";
import { useMyContext } from "../../Context/MyContext";
import Loader from "../../utils/Loader";

const Wishlist = () => {
  const { wishlistLoading, wishListItems } = useMyContext();

  return (
    <>
      {wishlistLoading ? (
        <Loader />
      ) : (
        <div className="wishlist">
          <div className="wishlist__container">
            <div className="wishlist__header">
              <h2>Your Wishlist</h2>
            </div>
            <div className="wishlist__items__container">
              <div className="wishlist__items">
                {wishListItems.length > 0 ? (
                  wishListItems.map((item) => (
                    <WishCard key={item._id} item={item} />
                  ))
                ) : (
                  <>No items</>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
