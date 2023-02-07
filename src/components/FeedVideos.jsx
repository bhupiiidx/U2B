import { Alert, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { HorizontalCard, VerticalCard, VideosCard, ChannelCard } from "./";

function FeedVideos({ feedDetail, loadFeed, showChannel }) {
	const { status, items, message } = feedDetail;
	return (
		<Box sx={{ p: { xs: 1, md: 5 } }}>
			{loadFeed ? (
				<>
					<Box sx={{ display: { xs: "block", md: "none" } }}>
						<HorizontalCard loopTime={4} />
					</Box>
					<Box sx={{ display: { xs: "none", md: "block" } }}>
						<VerticalCard loopTime={4} />
					</Box>
				</>
			) : (
				<Grid container spacing={2}>
					{status ? (
						<>
							{showChannel !== false &&
								items
									.filter((f) => f.id.channelId)
									.map((item, idx) => (
										<Grid key={idx} item xs={12}>
											<Link to={"/channel/" + item.id.channelId}>
												<ChannelCard horizontal={false} item={item} />
											</Link>
										</Grid>
									))}
							{items
								.filter((f) => f.id.videoId)
								.map((item, idx) => (
									<Grid item xs={12} sm={6} lg={4} xl={3} key={idx}>
										<Link to={"/video/" + item.id.videoId}>
											<VideosCard horizontal={item.id.videoId} item={item} />
										</Link>
									</Grid>
								))}
						</>
					) : (
						<Grid item xs={12}>
							<Alert severity="error">Error — {message}!</Alert>
						</Grid>
					)}
				</Grid>
			)}
		</Box>
	);
}

export default FeedVideos;
