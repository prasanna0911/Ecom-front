import { useEffect, useState } from "react";
import { useContext } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import "./index.css";
import { useMyContext } from "../../Context/MyContext";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { searchQuery, setSearchQuery } = useMyContext();
  const [value, setValue] = useState("");

  useEffect(() => {
    const query = queryParams.get("query");
    setValue(query);
  }, [searchQuery]);

  return (
    <div className="search__container">
      <div className="search__container__header">
        <h1>No results found for "{value}"</h1>
      </div>
    </div>
  );
};

export default Search;
