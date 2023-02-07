import { IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function SearchBar() {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchTerm.trim().length > 0) {
			navigate("/search/" + searchTerm);
			setSearchTerm("");
		}
	};

	return (
		<Paper
			component="form"
			onSubmit={handleSubmit}
			sx={{
				pl: 2,
				borderRadius: 20,
			}}
			elevation={0}
		>
			<input type="text" placeholder="Search" className="search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			<IconButton title="Search Feed" type="submit" sx={{ p: 2, color: "red" }}>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}

export default SearchBar;
