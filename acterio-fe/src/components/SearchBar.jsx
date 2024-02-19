// SearchBar.js
import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "50px",
    },
  },
  "& .MuiOutlinedInput-input": {},
});

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div
      style={{
        margin: "0 20% ",
      }}
    >
      <StyledTextField
        className="searchbar"
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
