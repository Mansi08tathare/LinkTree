const API_URL = "http://localhost:4000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Add token to the header
  };
};

export const register = async (data) => {
    console.log("Signup data being sent:", data);
    try {
        const response = await fetch(`${API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Response from register API:", result);

        if (!response.ok) {
            throw new Error(result.message || "Registration failed");
        }

        return result;
    } catch (error) {
        console.error("Error in register API:", error);
        throw error;
    }
};

export const login = async (data) => {
    try {
        console.log("Login data being sent:", data);
        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Response from login API:", result);

        if (!response.ok) {
            throw new Error(result.message || "Login failed");
        }

        localStorage.setItem("token", result.token);
        return result;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};
