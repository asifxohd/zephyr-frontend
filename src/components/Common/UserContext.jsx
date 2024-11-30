import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "@/src/services/interceptors/interceptors";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInformations, setUserInformations] = useState({
    username: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/api/user-details/");
        console.log(response.data)
        setUserInformations({
          name: response?.data?.name,
          avatar_image: response?.data?.avatar_image,
        });
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  
  return (
    <UserContext.Provider value={{ userInformations, loading }}>
      {children}
    </UserContext.Provider>
  );
};
