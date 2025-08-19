// convert.js
import * as XLSX from "xlsx/xlsx.mjs";
import * as fs from "fs";

XLSX.set_fs(fs);

// Read the Excel file
const workbook = XLSX.readFile("faculty.xlsx");

// Take the first sheet
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(sheet);

// Save as faculty.json
fs.writeFileSync("faculty.json", JSON.stringify(data, null, 2));

console.log("✅ faculty.json created!");
