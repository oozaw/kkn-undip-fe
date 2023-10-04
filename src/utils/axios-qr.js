import axios from "axios";
import { baseApiQR } from "@/utils/constant";

axios.defaults.headers["Content-Type"] = "image/png";

const baseQR = axios.create({
  baseURL: baseApiQR,
});

export { baseQR };
