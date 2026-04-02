import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherService = async (lat: number, lon: number) => {
    const res = await axios.get(`${BASE_URL}/weather`, {
        params: {
            lat,
            lon,
            appid: process.env.EXPO_PUBLIC_API_KEY,
            units: "metric",
            lang: "vi"
        }
    });
    console.log(">> check res data weather:", res.data);
    return res.data;
};

export const getForecastService = async (lat: number, lon: number) => {
    const res = await axios.get(`${BASE_URL}/forecast`, {
        params: {
            lat,
            lon,
            appid: process.env.EXPO_PUBLIC_API_KEY,
            units: "metric",
            lang: "vi",
        },
    });
    return res.data;
};