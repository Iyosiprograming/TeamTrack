import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/";

// ---------------- OWNER ---------------- //

// login owner
export const Signinowner = async (email: string, password: string, passcode: string) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}owner/login`,
      { email, password, passcode },
      { withCredentials: true } 
    );
    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error);
    throw error.response?.data || error;
  }
};

// get all employees and teams
export const getCounts = async () => {
  try {
    const [employeesRes, teamsRes] = await Promise.all([
      axios.get(`${BACKEND_URL}owner/getAllEmployes`, { withCredentials: true }),
      axios.get(`${BACKEND_URL}owner/getAllTeams`, { withCredentials: true }),
    ]);

    return {
      employeeCount: employeesRes.data.length,
      teamCount: teamsRes.data.length,
    };
  } catch (error: any) {
    console.error("Fetching counts failed:", error);
    throw error.response?.data || error;
  }
};

// create employee
export const createEmploye = async (name: string, email: string, age: number, gender: string, phone: string, role: string, salary: number) => {
  try {
    const response = await axios.post(`${BACKEND_URL}owner/createEmploye`, {name, email, age, gender, phone, role, salary}, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.error("Create employe failed:", error);
    throw error.response?.data || error;
  }
};

// create team
export const createTeam = async (name: string, description: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}owner/createTeam`, {name, description}, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.error("Create team failed:", error);
    throw error.response?.data || error;
  }
};

// get single employee
// search by NAME (not email)
export const getSingleEmploye = async (name: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}owner/getSingleEmploye/${name}`,
      { withCredentials: true }
    )
    return response.data
  } catch (error: any) {
    console.error('Get single employe failed:', error)
    throw error.response?.data || error
  }
}


// ---------------- EMPLOYEE ---------------- //

// login employee
export const loginemploye = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}employe/login`, { email, password }, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error);
    throw error.response?.data || error;
  }
};

// get profile
export const getProfile = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}employe/getProfile`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.error("Get profile failed:", error);
    throw error.response?.data || error;
  }
};

// update profile
export const updateProfile = async (data: { email?: string; password?: string; phone?: string }) => {
  try {
    const response = await axios.put(`${BACKEND_URL}employe/updateProfile`, data, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.error("Update profile failed:", error);
    throw error.response?.data || error;
  }
};

// attendance
export const attendance = async () => {
  try {
    const response = await axios.put(`${BACKEND_URL}employe/attendance`, {}, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.error("Mark attendance failed:", error);
    throw error.response?.data || error;
  }
};
