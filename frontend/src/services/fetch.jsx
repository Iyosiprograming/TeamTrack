// fetch login owner
import axios from "axios";

export const loginOwner = async (email, password, passcode) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/owner/login",
            {
                email,
                password,
                passcode,
            }
        );
        return response.data;
    } catch (error) {

        return {
            success: false,
            message: error?.response?.data?.message || "Something went wrong",
        };
    }
};
