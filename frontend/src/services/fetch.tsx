import axios from "axios";

// login owner
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

// get all employe and get all team for owner
export const getCounts = async () => {
    try {
        const [employeesRes, teamsRes] = await Promise.all([
            axios.get(`${BACKEND_URL}owner/getallemploye`, { withCredentials: true }),
            axios.get(`${BACKEND_URL}owner/getallteam`, { withCredentials: true }),
        ]);

        return {
            employeeCount: employeesRes.data.length,
            teamCount: teamsRes.data.length,
        };
    } catch (error: any) {
        console.error("Fetching counts failed:", error);
        throw error;
    }
};
// create Employe

export const createEmploye = async (data: { name: string, email: string, age: number, gender: string, phone: string, role: string, salary: number }) => {
    try {
        const response = await axios.post(`${BACKEND_URL}owner/createemploye`, data);
        return response.data;
    } catch (error: any) {
        console.error("Create employe failed:", error);
        throw error.response.data;
    }
}
// create team
export const createTeam = async (data: { name: string, description: string }) => {
    try {
        const response = await axios.post(`${BACKEND_URL}owner/createteam`, data);
        return response.data;
    } catch (error: any) {
        console.error("Create team failed:", error);
        throw error.response.data;
    }
}