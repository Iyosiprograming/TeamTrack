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
// get signle employe
export const getSingleEmploye = async (name: string) => {
    try {
        const response = await axios.get(`${BACKEND_URL}owner/getSingleEmploye/${name}`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        console.error("Get single employe failed:", error);
        throw error.response.data;
    }
}

// login employee
export const loginemploye = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BACKEND_URL}employe/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error: any) {
        console.error("Login failed:", error);
        throw error.response.data;
    }
}

// get profile
export const getProfile = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}employe/getProfile`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        console.error("Get profile failed:", error);
        throw error.response.data;
    }
}

// update employe profile
export const updateProfile = async (email: string, password: string, phone: string) => {
    try {
        const response = await axios.put(`${BACKEND_URL}employe/updateProfile`, {
            email,
            password,
            phone,
        });
        return response.data;
    } catch (error: any) {
        console.error("Update profile failed:", error);
        throw error.response.data;
    }
}

// atendace
export const attendance = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}employe/attendance`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        console.error("Get attendance failed:", error);
        throw error.response.data;
    }
}