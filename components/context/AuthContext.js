import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// defining context
const AuthContext = createContext();

// AuthProvider wraps AuthContext.Provider
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user]);

  // is input data are valid, get the user's token and store it in the broswer's cookie
  const login = async ({ username, password }) => {
    // console.log("AuthContext login: start");
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", { 
        username,
        password,
      });
      // get user's token from backend and store it in a cookie
      // console.log("AuthContext Login res.data:", res.data); // get access token

      // if user's token exist, extract the token from cookie and hit the server another time for verification
      if (res.data.success) {
        // console.log("res.data.access_token", res.data.access_token)
        loadUser();
        setIsAuthenticated(true);
        setLoading(false);
        
        router.push("/"); // push to "home page"
      }
    } catch (error) {
      // console.log("AuthContext error:", error.message);
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/auth/me");
      // console.log("AuthContext loadUser() res:", res);

      if (res.data.user) {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
        setAccessToken(res.data.access_token) // why is it not working
      }
    } catch (error) {
      // console.log("Load user context error:", error);
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");

      if (res.data.success) {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      // console.log("Logout user context error:", error);
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // console.log("setAccessToken", accessToken)
  // console.log("setUser", user)
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


// AuthContext.Provider content
// {
//   "value": {
//     "user": {
//       "first_name": "Guest",
//       "last_name": "Dear",
//       "role": "user",
//       "user_id": 1,
//       "username": "guest@powersecure.com"
//     },
//     "loading": false,
//     "error": null,
//     "isAuthenticated": true,
//     "login": "ƒ login() {}",
//     "logout": "ƒ logout() {}"
//   },
//   "children": [
//     "<MainHeader />",
//     "<Navbar />",
//     "<div />",
//     "<Footer />"
//   ]
// }



