import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FeedVideos } from "./";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { unstable_batchedUpdates } from "react-dom";
import { useParams } from "react-router-dom";

function SearchFeed() {
	const { searchTerm } = useParams();
	const [feedVideoState, setFeedVideoState] = useState({
		status: false,
		items: [],
		message: "Wait...",
	});
	const [loadFeed, setLoadFeed] = useState(false);

	const getFeedVideos = async () => {
		setLoadFeed(true);

		await fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((response) => {
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
	}, [searchTerm]);

	return (
		<Box sx={{ p: 2, overflowY: "auto", height: "90vh", flex: 2 }}>
			<Typography variant="h4" fontWeight="bold" sx={{ mt: 1.5, color: "#ddd" }}>
				Search results for: <span style={{ color: "#f31503" }}> {searchTerm} </span> videos
			</Typography>
			<FeedVideos feedDetail={feedVideoState} loadFeed={loadFeed} />
		</Box>
	);
}

export default SearchFeed;
