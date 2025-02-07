import * as XLSX from 'xlsx'; 


export default function DownloadXLSX(data, file_name) {
  //   console.log("clicked download");
    // console.log("data", data)
  //   console.log("csv_name:", csv_name)
  
  const worksheet =  XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, "BOM");
  XLSX.writeFile(workbook, file_name+".xlsx");

  return data;
}
