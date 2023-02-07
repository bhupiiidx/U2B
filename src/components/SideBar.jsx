import { Stack } from "@mui/system";
import React from "react";
import { categories } from "../utils/constants";

function SideBar({ selectedCategory, setSelectedCategory }) {
	return (
		<Stack
			direction={"row"}
			sx={{
				overflowY: "auto",
				height: { xs: "auto", md: "95%" },
				flexDirection: { md: "column" },
			}}
		>
			{categories.map((category) => {
				return (
					<button
						className="category-btn"
						style={{
							backgroundColor: selectedCategory === category.name && "#fc1503",
							color: "white",
						}}
						key={category.name}
						onClick={() => setSelectedCategory(category.name)}
					>
						<span style={{ color: selectedCategory === category.name ? "white" : "#fc1503", marginRight: "15px" }}>{category.icon}</span>
						<span style={{ opacity: 0.8 }}>{category.name}</span>
					</button>
				);
			})}
		</Stack>
	);
}

export default SideBar;
