import * as s$mahasiswa from "@/service/mahasiswa";

// const s$mahasiswa = require("@/service/mahasiswa");

let listData = [];
let statusData = null;

async function listMahasiswa() {
  console.log("listMahasiswa ini");
  try {
    const { data, status } = await s$mahasiswa.listMahasiswa();
    listData = data ?? [];
    statusData = status;
  } catch ({ message, error }) {
    statusData = false;
    throw message ?? error;
  }
}

function test() {
  listData = "Ok";
  statusData = true;
}

self.onmessage = async (e) => {
  console.log("Halooo", e.data);
  if (e.data === "listMahasiswa") {
    // Perform the calculation
    // self.postMessage({ type: "SET_WORKING", payload: true });
    await listMahasiswa();
    self.postMessage({ data: listData, status: statusData });
    // self.postMessage({ type: "SET_WORKING", payload: false });
  } else if (e.data === "test") {
    console.log("test masuk");
    test();
    self.postMessage({ data: listData, status: statusData });
  }
};
