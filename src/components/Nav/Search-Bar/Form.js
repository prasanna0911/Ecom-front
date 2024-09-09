import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Form.css";
import { useContext } from "react";
import { SearchContext } from "../../../Context/SearchContext";
import { useMyContext } from "../../../Context/MyContext";

const Form = () => {
  const [searchInput, setSearchInput] = useState("");
  // const searchContext = useContext(SearchContext)
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useMyContext();

  const handelChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    navigate("/search");
  };

  return (
    <form className="search__form" onSubmit={handelFormSubmit}>
      <input
        type="text"
        placeholder="Search for products"
        className="search__form__input"
        value={searchInput}
        onChange={handelChange}
        required
      />
      <button className="search__form__button" type="submit">
        <SearchIcon fontSize="medium" />
      </button>
    </form>
  );
};

export default Form;
