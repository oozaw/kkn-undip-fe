const ExcelJS = require("exceljs");

// read from a file
async function read() {
  const workbook = new ExcelJS.Workbook();

  await workbook.xlsx.readFile(
    "src/assets/others/Template Ekspor Data Peserta.xlsx"
  );

  const worksheet = workbook.worksheets[0];

  // judul
  worksheet.getCell("A2").value =
    "KULIAH KERJA NYATA (KKN) UNIVERSITAS DIPONEGORO TIM I TAHUN AKADEMIK 2022/2999";
  worksheet.getCell("A3").value = "PERIODE";
  worksheet.getCell("A5").value = "KABUPATEN: CITAYEM";
  worksheet.getCell("A6").value = "KECAMATAN: CITAYEM JAYA";
  worksheet.getCell("A8").value = "JUMLAH: 199";
  worksheet.getCell("A9").value = "LAKI-LAKI: 99";
  worksheet.getCell("A10").value = "PEREMPUAN: 100";

  // style
  const style = {
    font: {
      name: "Roboto",
      size: 12,
    },
    alignment: {
      vertical: "middle",
    },
  };

  // data mahasiswa
  worksheet.columns = [
    { key: "no", width: 5, style },
    { key: "nim", width: 22, style },
    { key: "nama", width: 46, style },
    { key: "jenis_kelamin", width: 13, style },
    { key: "ttl", width: 40, style },
    { key: "no_hp", width: 23, style },
    { key: "alamat", width: 34, style },
    { key: "riwayat_penyakit", width: 23, style },
    { key: "fakultas", width: 27, style },
    { key: "jurusan", width: 26, style },
    { key: "nama_ortu", width: 23, style },
    { key: "alamat_ortu", width: 38, style },
    { key: "no_hp_ortu", width: 23, style },
    { key: "nama_cp_urgent", width: 46, style },
    { key: "no_hp_cp_urgent", width: 23, style },
    { key: "alamat_cp_urgent", width: 34, style },
    { key: "hubungan", width: 22, style },
  ];

  const row = worksheet.getRow(13);

  row.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  row.values = {
    id_mahasiswa: 1,
    id_user: 112,
    id_prodi: 4,
    nama: "Amnan Sholahuddin",
    nim: "12010119130257",
    jenis_kelamin: 1,
    ttl: null,
    no_hp: "089514116330",
    alamat:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare porta libero, eu feugiat e",
    riwayat_penyakit: null,
    nama_ortu: "Lorem ipsum dolor sit amet.",
    no_hp_ortu: "999999999999",
    alamat_ortu:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare porta libero, eu feugiat e",
    nama_cp_urgent: "Lorem ipsum dolor sit amet.",
    no_hp_cp_urgent: "999999999999",
    alamat_cp_urgent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare porta libero, eu feugiat e",
    foto_profile: null,
    hubungan: "Lorem ipsum dolor sit amet.",
  };

  console.log(worksheet.getRow(13).values);

  await workbook.xlsx.writeFile(
    "src/assets/others/Template Ekspor Data Peserta Hasil.xlsx"
  );
}

// read();

export { read };
