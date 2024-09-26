import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { useMyContext } from "../../Context/MyContext";
import ItemCard from "../Card/ItemCard/ItemCard";
import { ApiServices } from "../../api/api";
import EmptyComponent from "../EmptyComponent.js";
import Loader from "../../utils/Loader.js";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { searchQuery, setSearchQuery } = useMyContext();
  const [value, setValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = queryParams.get("query");
    setValue(query);
  }, [searchQuery]);

  const getFilteredItems = async () => {
    setLoading(true);
    ApiServices.GetAllProducts()
      .then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          const filteredData = res.Data.filter(
            (item) =>
              (item.name &&
                item.name.toLowerCase().includes(lowerCaseSearchQuery)) ||
              (item.description &&
                item.description.toLowerCase().includes(lowerCaseSearchQuery))
          );
          console.log("filteredData", filteredData);
          setFilteredItems(filteredData);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getFilteredItems();
  }, [searchQuery]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : filteredItems.length > 0 ? (
        <div className="category__card__container flex-column my-4">
          <div>
            <h4>Search results for "{searchQuery}"</h4>
            <div className="search__header__line"></div>
            <div className="category__product__card">
              {filteredItems?.map((data) => (
                <ItemCard item={data} category={filteredItems.category} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EmptyComponent
          height="100vh"
          text={`No results found for "${searchQuery}"`}
        />
      )}
    </>
  );
};

export default Search;
