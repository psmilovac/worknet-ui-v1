import axios from "axios";
import cookie from "cookie";
import { api_root } from "@/global/global_vars";

export default async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  res.setHeader("Set-Cookie", [
    cookie.serialize("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: new Date(0),
      sameSite: "Lax",
      path: "/",
    }),
  ]);
  return res.status(200).json({
    success: true,
  });
};
