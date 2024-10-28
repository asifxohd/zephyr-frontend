import {jwtDecode} from "jwt-decode";

function useAuth() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken);
      return decodedToken.role;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
}

export default useAuth;
