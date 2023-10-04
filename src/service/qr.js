import { baseQR } from "@/utils/axios-qr";

const api = `/`;

const generateQR = (data) =>
  baseQR.get(`${api}create-qr-code/`, {
    params: {
      data: data,
      size: "200x200",
    },
    responseType: "blob",
  });

export { generateQR };
