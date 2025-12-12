import axios from "axios";

// Get backend URL from env (Vite)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/";

export const Signinowner = async (email: string, password: string, passcode: string) => {
    try {
        const response = await axios.post(`${BACKEND_URL}owner/login`, {
            email,
            password,
            passcode,
        });
        return response.data;
    } catch (error: any) {
        console.error("Login failed:", error);
        throw error;
    }
};
