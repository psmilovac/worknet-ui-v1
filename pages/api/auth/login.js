import axios from "axios";
import cookie from "cookie";
import { api_root } from "@/global/global_vars";

// # login user and receive access_token
export default async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const url = api_root + "/api/login";
  const { username, password } = req.body;
  const reqBody = { username, password };
  const config = { "content-type": "application/json" };

  try {
    const response = await axios.post(url, reqBody, config);
    if (response.data.access_token) {
      res.setHeader("Set-Cookie", [
        cookie.serialize("access_token", response.data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 15,
          sameSite: "Lax",
          path: "/",
        }),
      ]);
      return res.status(200).json({
        success: true,
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      });
    } else {
      res.status(response.status).json({
        error: "Authentication failed",
      });
    }
  } catch (error) {
    // console.log("login error:", error.response.data.message)
    // console.log("login error status:", error.response.data.code)
    res.status(error.response.status).json({
      error: error.response && error.response.data.message,
    });
  }
};
