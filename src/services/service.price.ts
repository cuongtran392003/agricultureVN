import axios from "axios";
const API_BASE_URL = "https://69bbcd470915748735ba4807.mockapi.io/api/v1/prices";

export const getPriceService = async () => {
    try {
        const res = await axios.get(API_BASE_URL);
        return res.data
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu từ MockAPI:", error);
        throw error;
    }
}