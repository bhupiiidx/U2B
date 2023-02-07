import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useParams } from "react-router-dom";
import { ChannelCard, FeedVideos, HorizontalCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { HorizontalSkeleton } from "./skeleton/HorizontalCard";

function ChannelDetail() {
	const { channelFeedId } = useParams();
	const [feedChannelState, setFeedChannelState] = useState(null);
	const [loadFeed, setLoadFeed] = useState(false);

	const getFeedChannelDeatil = async () => {
		setLoadFeed(true);

		var channelDeatil = {};
		var channelVideos = {};

		await fetchFromAPI(`channels?part=snippet&id=${channelFeedId}`).then((response) => {
			if (response.status && response?.data?.items?.length) {
				channelDeatil = {
					status: response.status,
					detail: response.data.items[0],
					message: channelFeedId + " channel detail found successfully",
				};
			} else {
				channelDeatil = {
					status: response.status,
					detail: null,
					message: response.message,
				};
			}
		});

		await fetchFromAPI(`search?part=snippet&channelId=${channelFeedId}&order=date`).then((response) => {
			if (response.status && response?.data?.items?.length) {
				channelVideos = {
					status: response.status,
					items: response.data.items,
					message: response.data.items.length + " channel videos found for channelId " + channelFeedId,
				};
			} else {
				channelVideos = {
					status: response.status,
					items: null,
					message: response.message,
				};
			}
		});

		unstable_batchedUpdates(() => {
			setLoadFeed(false);
			setFeedChannelState({ channelDeatil, channelVideos });
		});
	};

	useEffect(() => {
		getFeedChannelDeatil();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [channelFeedId]);

	return (
		<Box minHeight="95vh">
			<div
				style={{
					background: "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
					zIndex: 10,
					height: "300px",
				}}
			></div>

			{feedChannelState?.channelDeatil?.status ? (
				<ChannelCard loadFeed={loadFeed} marginTop="-93px" horizontal={true} item={feedChannelState.channelDeatil.detail} />
			) : (
				<Box
					sx={{
						width: "100%",
						zIndex: 1,

						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "-93px",
					}}
				>
					<Box sx={{ width: 250 }}>
						<HorizontalSkeleton borderRadius="50%" showHeight={200} />
					</Box>
				</Box>
			)}
			{feedChannelState?.channelDeatil?.status ? (
				<FeedVideos showChannel={false} horizontal={true} feedDetail={feedChannelState.channelVideos} loadFeed={loadFeed} />
			) : (
				<HorizontalCard loopTime={5} fullWidth={true} />
			)}
		</Box>
	);
}

export default ChannelDetail;
