import { Box } from "@mui/system";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed } from "./components";

function App() {
	return (
		<BrowserRouter>
			<Box className="bg-gray-900 pb-2">
				<Navbar />
				<Routes>
					<Route path="/" element={<Feed />} />
					<Route path="/video/:videoFeedId" element={<VideoDetail />} />
					<Route path="/channel/:channelFeedId" element={<ChannelDetail />} />
					<Route path="/search/:searchTerm" element={<SearchFeed />} />
				</Routes>
			</Box>
		</BrowserRouter>
	);
}

export default App;
