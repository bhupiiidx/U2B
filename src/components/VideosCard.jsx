import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function VideosCard({ horizontal, item }) {
	return (
		<>
			<div>
				{horizontal ? (
					<Box sx={{ borderRadius: { xs: 3, md: 2 }, py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, pt: 0, backgroundColor: "grey.900" }}>
						<Box
							sx={{
								height: {
									xs: 200,
									sm: 250,
									md: 200,
									lg: 300,
								},
								zIndex: 1,
							}}
						>
							<img style={{ height: "100%", width: "100%" }} alt={item.snippet.title} src={item.snippet.thumbnails.medium.url} />
						</Box>
						<Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: "5px" }}>
							<Typography gutterBottom variant="body2" color="grey.200">
								{item.snippet.title}
							</Typography>
							<Link to={"/channel/" + item.snippet.channelId}>
								<Typography variant="caption" color="grey.50" className="flex justify-start items-center">
									{item.snippet.channelTitle}
									<CheckCircleIcon sx={{ color: "grey.500", ml: 1, fontSize: "14px" }} />
								</Typography>
							</Link>
							<Typography variant="caption" color="grey.500">
								{/* {`${item.snippet.views} • ${item.snippet.createdAt}`} */}
								{item.snippet.description.slice(0, 100)} {item.snippet.description.length > 100 && "..."}
							</Typography>
						</Box>
					</Box>
				) : (
					<Box sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, pt: 0, display: "flex", gap: "20px" }}>
						<Box
							sx={{
								height: {
									xs: 150,
									sm: 250,
									md: 200,
									lg: 300,
								},
								zIndex: 1,
								flex: 1,
							}}
						>
							<img style={{ height: "100%" }} alt={item.snippet.title} src={item.snippet.thumbnails.default.url} />
						</Box>
						<Box sx={{ pt: 2, flex: 2 }}>
							<Typography gutterBottom variant="body2" color="grey.100">
								{item.snippet.title}
							</Typography>
							<Link to={"/channel/" + item.snippet.channelId}>
								<Typography variant="caption" color="grey.50" className="flex justify-start items-center">
									{item.snippet.channelTitle}
									<CheckCircleIcon sx={{ color: "grey.500", ml: 1, fontSize: "14px" }} />
								</Typography>
							</Link>
							<Typography variant="caption" color="grey.500">
								{/* {`${item.snippet.views} • ${item.snippet.createdAt}`} */}
								{item.snippet.description}
							</Typography>
						</Box>
					</Box>
				)}
			</div>
		</>
	);
}

export default VideosCard;
