import { Box, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function ChannelCard({ horizontal, item, marginTop }) {
	return (
		<>
			<div>
				{horizontal ? (
					<Box sx={{ py: { xs: 1, md: 2 }, px: { xs: 0, md: 2 }, pt: 0 }}>
						<Box
							sx={{
								width: "100%",
								zIndex: 1,
								borderRadius: "50%",
								textAlign: "center",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								marginTop,
							}}
						>
							<Box
								sx={{
									height: {
										xs: 150,
										sm: 150,
										md: 150,
										lg: 150,
									},
									width: {
										xs: 150,
										sm: 150,
										md: 150,
										lg: 150,
									},
									zIndex: 1,
									borderRadius: "50%",
								}}
							>
								<img
									style={{ height: "100%", borderRadius: "50%" }}
									alt={item.snippet.title}
									src={item.snippet.thumbnails.default.url}
								/>
							</Box>
						</Box>
						<Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center", alignItems: "center" }}>
							<Typography gutterBottom variant="body2" color="grey.200">
								{item.snippet.title.slice(0, 50)} {item.snippet.title.length > 50 && "..."}
								<CheckCircleIcon sx={{ color: "grey.500", ml: 1, fontSize: "14px" }} />
							</Typography>
							{item?.statistics?.subscriberCount ? (
								<Typography variant="caption" color="grey.500" className="flex justify-start items-center">
									{item.statistics.subscriberCount} Subscribers
								</Typography>
							) : (
								<Typography variant="caption" color="grey.500">
									{/* {`${item.snippet.views} • ${item.snippet.createdAt}`} */}
									{item.snippet.description.slice(0, 60)} {item.snippet.description.length > 60 && "..."}
								</Typography>
							)}
						</Box>
					</Box>
				) : (
					<Box sx={{ py: { xs: 1, md: 2 }, px: { xs: 0, md: 2 }, pt: 0, display: "flex", gap: "20px" }}>
						<Box
							sx={{
								zIndex: 1,
								textAlign: "center",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flex: 1,
							}}
						>
							<Box
								sx={{
									height: 150,
									width: 150,
									zIndex: 1,
								}}
							>
								<img
									style={{ height: "100%", borderRadius: "50%" }}
									alt={item.snippet.title}
									src={item.snippet.thumbnails.default.url}
								/>
							</Box>
						</Box>
						<Box sx={{ pt: 2, flex: 2, display: "flex", flexDirection: "column", gap: "5px", justifyContent: "flex-start" }}>
							<Typography gutterBottom variant="body2" color="grey.200">
								{item.snippet.title.slice(0, 50)} {item.snippet.title.length > 50 && "..."}
								<CheckCircleIcon sx={{ color: "grey.500", ml: 1, fontSize: "14px" }} />
							</Typography>
							{item?.statistics?.subscriberCount && (
								<Typography variant="caption" color="grey.500" className="flex justify-start items-center">
									{item.statistics.subscriberCount} Subscribers
								</Typography>
							)}
							{item?.snippet?.description && (
								<Typography variant="caption" color="grey.500">
									{/* {`${item.snippet.views} • ${item.snippet.createdAt}`} */}
									{item.snippet.description.slice(0, 60)} {item.snippet.description.length > 60 && "..."}
								</Typography>
							)}
						</Box>
					</Box>
				)}
			</div>
		</>
	);
}

export default ChannelCard;
