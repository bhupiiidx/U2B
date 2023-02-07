import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { SideBar, FeedVideos } from "./";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { unstable_batchedUpdates } from "react-dom";

function Feed() {
	const [feedVideoState, setFeedVideoState] = useState({
		status: false,
		items: [],
		message: "Wait...",
	});
	const [selectedCategory, setSelectedCategory] = useState("New");
	const [loadFeed, setLoadFeed] = useState(false);

	const getFeedVideos = async () => {
		setLoadFeed(true);

		await fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((response) => {
			if (response.status && response?.data?.items?.length) {
				unstable_batchedUpdates(() => {
					setLoadFeed(false);
					setFeedVideoState({
						status: response.status,
						items: [...response.data.items],
						message: response.data.items.length + " items found",
					});
				});
			} else {
				unstable_batchedUpdates(() => {
					setLoadFeed(false);
					setFeedVideoState({
						status: response.status,
						items: [],
						message: response.message,
					});
				});
			}
		});
	};

	useEffect(() => {
		getFeedVideos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory]);

	return (
		<Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
			<Box sx={{ height: { sx: "auto", md: "92vh" }, px: { xs: 0, md: 2 }, borderRight: "1px solid #3d3d3d" }}>
				<SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
				<Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#bbb" }}>
					Bhupiidx Craetion 2023
				</Typography>
			</Box>
			<Box sx={{ p: 2, overflowY: "auto", height: "90vh", flex: 2 }}>
				<Typography variant="h4" fontWeight="bold" sx={{ mt: 1.5, color: "#ddd" }}>
					{selectedCategory}
					<span style={{ color: "#f31503" }}> videos</span>
				</Typography>
				<FeedVideos feedDetail={feedVideoState} loadFeed={loadFeed} />
			</Box>
		</Stack>
	);
}

export default Feed;
