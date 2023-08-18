import * as s$mahasiswa from "@/service/mahasiswa";

let listData = [];
let status = null;

async function listMahasiswa() {
  console.log("listMahasiswa ini");
  try {
    const { data, status } = await s$mahasiswa.listMahasiswa();
    listData = data ?? [];
    status = status;
  } catch ({ message, error }) {
    status = false;
    throw message ?? error;
  }
}

onmessage = async (e) => {
  console.log("Halooo");
  if (e.data === "listMahasiswa") {
    // Perform the calculation
    // self.postMessage({ type: "SET_WORKING", payload: true });
    await listMahasiswa();
    self.postMessage({ data: listData, status: status });
    // self.postMessage({ type: "SET_WORKING", payload: false });
  }
};
