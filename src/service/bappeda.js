import { baseApi } from "@/utils/axios";

const api = `/bappeda`;

const listBappeda = () => {
  try {
    baseApi.get(`${api}`);
  } catch (error) {
    console.log("error bro", error);
  }
};

export { listBappeda };
