import React from "react";
import { SearchInput } from "../searchInput/SearchInput";

export const SearchBar = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("search");

    props.onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchInput value={props.value} onChange={props.onChange} />
      <button className="border border-blue-600 bg-gray-500 ml-2" type="submit">
        Submit
      </button>
    </form>
  );
};
