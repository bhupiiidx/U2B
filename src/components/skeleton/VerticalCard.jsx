import { Box, Skeleton } from "@mui/material";
import React from "react";

function VerticalCard({ loopTime }) {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: "20px", my: 4 }}>
			{[...Array(loopTime ? loopTime : 1)].map((_, idx) => (
				<Box key={idx} sx={{ display: "flex", gap: "20px" }}>
					<Skeleton
						sx={{
							bgcolor: "grey.800",
							flex: 1,
							height: {
								xs: 150,
								sm: 250,
								md: 200,
								lg: 300,
							},
							zIndex: 1,
						}}
						variant="rounded"
					/>
					<Box sx={{ flex: 2 }}>
						<Skeleton
							sx={{
								bgcolor: "grey.800",
								height: {
									xs: 50,
								},
								zIndex: 1,
							}}
						/>
						<Skeleton
							sx={{
								bgcolor: "grey.800",
								height: {
									xs: 50,
								},
								zIndex: 1,
							}}
						/>

						<Skeleton
							sx={{
								bgcolor: "grey.800",
								height: {
									xs: 50,
									sm: 70,
								},
								width: 150,
								zIndex: 1,
							}}
						/>
					</Box>
				</Box>
			))}
		</Box>
	);
}

export default VerticalCard;
