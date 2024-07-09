import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export function SearchInput() {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-skt-500 text-white">
        <SearchIcon className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}
