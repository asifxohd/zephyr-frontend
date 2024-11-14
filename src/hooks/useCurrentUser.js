import {jwtDecode} from "jwt-decode";

function useCurrentUser() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken);
      return decodedToken
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
}

export default useCurrentUser;
