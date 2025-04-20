import api from "./refreshToken";

export const registerUser = async (userData) => {
   console.log(userData);
   try {
      const { data } = await api.post("/auth/register", userData);
      return data;
   } catch (error) {
      console.error("Registration error:", error.response?.data);
      throw error.response || new Error("Registration failed");
   }
};
