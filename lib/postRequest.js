import axios from "axios";
import { parseCookies } from "nookies";
import {hostname} from "./config";


export default async function postRequest(url, data, token = null) {
  const cookies = parseCookies();
  
  const config = {
    headers: {
      Authorization: `Bearer ${token ? token || "" : cookies?.token || ""}`,
    },
  };

  try {
    const res = await axios.post(`${hostname}/lexin-api/${url}`, data, config);
    if (res.hasOwnProperty("data")) {
      return res?.data;
    } else {
    }
  } catch (error) {
    return error?.response?.data;
  }
}
