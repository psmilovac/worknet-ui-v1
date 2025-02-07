// not used anywhere
import axios from "axios";
import { api_root } from "@/global/global_vars";

export const isAuthenticated = async (access_token) => {
  const url = api_root + "/api/token/verify";
  const reqBody = { token: access_token };

  try {
    const response = await axios.post(url, reqBody);
    if (response.status === 200) return true;
    return false;
  } catch (error) {
    return false;
  }
};
