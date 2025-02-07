import axios from "axios";
import cookie from "cookie";
import { api_root } from "@/global/global_vars";

// get the cookie from the browser, extract token and sent it to the back end as bearer to extract user data
export default async (req, res) => {
  if (req.method !== "GET") {
    return;
  }
  
  const cookies = cookie.parse(req.headers.cookie || "");
  const access_token = cookies.access_token || false;

  if (!access_token) {
    // return res.status(401).json({ error: "Login first to load user" }); // this case shows this message at the start when index page useEffect loads
    return res.status(401).json({
      // error: "To load the user you must login first"
    });
  }

  const url = api_root + "/api/me"; 
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.get(url, config);

    if (response.data) {
      // console.log("response", response)
      return res.status(200).json({ user: response.data, access_token: access_token });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong while retrieving user",
    });
  }
};
