import React from "react";

export const SearchInput = (props) => {
  return (
    <input
      type="search"
      name="search"
      autoComplete="off"
      className="border border-gray-500"
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder ?? "Search"}
    />
  );
};
