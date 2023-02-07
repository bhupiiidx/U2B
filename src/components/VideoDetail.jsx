import { PlayArrow } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromApi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VideosCard from "./VideosCard";
import HorizontalCard from "./skeleton/HorizontalCard";
import VerticalCard from "./skeleton/VerticalCard";

function VideoDetail() {
	const { videoFeedId } = useParams();
	const [videoDetailState, setVideoDetailState] = useState({
		status: false,
		detail: null,
		message: "Wait...",
	});
	const [loadFeed, setLoadFeed] = useState(false);

	const [relatedVideoState, setRelatedVideoState] = useState({
		status: false,
		detail: null,
		message: "Wait...",
	});
	const [loadRelated, setLoadRelated] = useState(false);

	const getVideoDetail = async () => {
		setLoadFeed(true);
		setLoadRelated(true);

		const response = await fetchFromAPI(`videos?part=snippet&id=${videoFeedId}`);
		if (response.status && response?.data?.items?.length) {
			unstable_batchedUpdates(() => {
				setLoadFeed(false);
				setVideoDetailState({
					status: response.status,
					detail: response.data.items[0],
					message: " item detail found",
				});
			});
		} else {
			unstable_batchedUpdates(() => {
				setLoadFeed(false);
				setVideoDetailState({
					status: response.status,
					detail: null,
					message: response.message,
				});
			});
		}

		const related_response = await fetchFromAPI(`search?part=snippet&relatedToVideoId=${videoFeedId}&type=video`);
		if (related_response.status && related_response?.data?.items?.length) {
			unstable_batchedUpdates(() => {
				setLoadRelated(false);
				setRelatedVideoState({
					status: related_response.status,
					items: related_response.data.items,
					message: " item detail found",
				});
			});
		} else {
			unstable_batchedUpdates(() => {
				setLoadRelated(false);
				setRelatedVideoState({
					status: related_response.status,
					items: [],
					message: related_response.message,
				});
			});
		}
	};

	useEffect(() => {
		getVideoDetail();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoFeedId]);

	if (videoDetailState?.status) {
		return (
			<Box minHeight="95vh">
				<Stack direction={{ xs: "column", md: "row" }}>
					{loadFeed ? (
						<></>
					) : (
						<Box flex={{ md: 2, lg: 3 }}>
							<Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
								<ReactPlayer
									url={`https://www.youtube.com/watch?v=${videoFeedId}`}
									controls={true}
									pip={true}
									stopOnUnmount={false}
									playIcon={<PlayArrow />}
									width="100%"
									height="100%"
									className="react-player"
								/>
								<Typography variant="h5" sx={{ mt: 1.5, color: "#eee", p: 2 }}>
									{videoDetailState.detail.snippet.title}
								</Typography>
								<Stack direction="row" justifyContent="space-between" px={2} py={1}>
									<Link to={"/channel/" + videoDetailState.detail.snippet.channelId}>
										<Typography variant="caption" color="grey.50" className="flex justify-start items-center">
											{videoDetailState.detail.snippet.channelTitle}
											<CheckCircleIcon sx={{ color: "grey.500", ml: 1, fontSize: "14px" }} />
										</Typography>
									</Link>
									<Stack direction="row" alignItems="center" gap="20px">
										<Typography variant="body1" sx={{ opacity: "0.7" }} color="grey.50">
											{videoDetailState.detail.statistics.viewCount} views
										</Typography>
										<Typography variant="body1" sx={{ opacity: "0.7" }} color="grey.50">
											{videoDetailState.detail.statistics.likeCount} like
										</Typography>
									</Stack>
								</Stack>
							</Box>
						</Box>
					)}
					<Box flex={1}>
						<Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
							{loadRelated ? (
								<>
									<Box sx={{ display: { xs: "block", md: "none" } }}>
										<HorizontalCard loopTime={4} />
									</Box>
									<Box sx={{ display: { xs: "none", md: "block" } }}>
										<VerticalCard loopTime={4} />
									</Box>
								</>
							) : (
								relatedVideoState?.items?.length > 0 &&
								relatedVideoState?.items?.map((item, idx) =>
									item?.snippet ? (
										<Box key={idx}>
											<Link to={"/video/" + item.id.videoId}>
												<VideosCard item={item} horizontal={true} />
											</Link>
										</Box>
									) : null
								)
							)}
						</Box>
					</Box>
				</Stack>
			</Box>
		);
	}
	return <></>;
}

export default VideoDetail;
