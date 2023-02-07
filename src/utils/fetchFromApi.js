import axios from "axios";

const options = {
	params: {
		part: "id,snippet",
		maxResults: "50",
	},
	headers: {
		"X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
		"X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
	},
};

export const fetchFromAPI = async (url: string) => {
	return await axios
		.get(`${process.env.REACT_APP_BASE_URL}${url}`, options)
		.then((response) => {
			console.log("success ---", url);
			if (response.status === 200) {
				return { status: true, data: response.data, message: "Successfully fetched data" };
			} else {
				return { status: false, data: {}, message: "Unable to fetched data" };
			}
		})
		.catch((error) => {
			console.log("error ---", url, error.message, error.response.data.message);
			let message = "Unable to fetch data";
			if (error.message) {
				message = error.message;
			}
			if (error?.response?.data?.message) {
				message = error.response.status + " - " + error.response.data.message;
			}
			return { status: false, data: {}, message };
		});
};
