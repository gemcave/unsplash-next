import { useState } from "react";
import Router from "next/router";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  const [term, setTerm] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    Router.push(`/search?term=${term}`);
  };

  const handleInput = (e) => setTerm(e.target.value);

  return (
    <>
      <form className="search-form" onSubmit={onFormSubmit}>
        <input
          type="text"
          name="term"
          placeholder="nature,beauty,product..."
          onChange={handleInput}
          value={term}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      <style jsx>{`
        .search-form {
          display: inline-flex;
          font-size: 16px;
        }
        .search-form input {
          border: 1px solid #767676;
        }
        .search-form button {
          display: flex;
          align-items: center;
          margin-left: 5px;
          border: 1px solid #767676;
          color: #333;
          outline: none;
          background: transparent;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default SearchInput;
