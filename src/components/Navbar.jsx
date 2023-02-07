import React from "react";
import { Stack } from "@mui/material";
import { logo } from "../utils/constants";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
	return (
		<Stack
			direction="row"
			alignItems="center"
			p={2}
			sx={{
				top: "0",
				position: "sticky",
				justifyContent: "space-between",
				zIndex: 2,
			}}
			className="bg-gray-900"
		>
			<Link to="/" className="bg-slate-50">
				<img src={logo} alt="Logo" width={50} />
			</Link>
			<SearchBar />
		</Stack>
	);
}

export default Navbar;
