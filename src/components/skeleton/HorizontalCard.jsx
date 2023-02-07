import { Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export function HorizontalSkeleton({ borderRadius, showHeight }) {
	return (
		<Box sx={{ py: { xs: 1, md: 2 }, px: { xs: 0, md: 2 }, pt: 0 }}>
			<Skeleton
				variant="rectangular"
				sx={{
					bgcolor: "grey.800",
					height: showHeight
						? showHeight
						: {
								xs: 200,
								sm: 250,
								md: 200,
								lg: 300,
						  },
					zIndex: 1,
					borderRadius,
				}}
			/>
			<Box sx={{ pt: 0.5 }}>
				<Skeleton sx={{ bgcolor: "grey.800", height: 40, zIndex: 1 }} />
				<Skeleton sx={{ bgcolor: "grey.800", height: 40, zIndex: 1 }} width="60%" />
			</Box>
		</Box>
	);
}

function HorizontalCard({ loopTime }) {
	return (
		<Grid container>
			{[...Array(loopTime ? loopTime : 1)].map((_, idx) => (
				<Grid item xs={12} sm={6} lg={4} xl={3} key={idx}>
					<HorizontalSkeleton />
				</Grid>
			))}
		</Grid>
	);
}

export default HorizontalCard;
