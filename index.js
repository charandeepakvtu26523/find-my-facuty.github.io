import * as XLSX from "xlsx/xlsx.mjs";
import * as fs from "fs";
import readline from "readline";

XLSX.set_fs(fs);

// ✅ Read Excel file
const workbook = XLSX.readFile("faculty.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

// Setup readline for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to search faculty
function searchFaculty(query) {
  const results = data.filter(
    f =>
      (f.name && f.name.toString().toLowerCase().includes(query.toLowerCase())) ||
      (f.id && f.id.toString().toLowerCase().includes(query.toLowerCase())) ||
      (f.department && f.department.toString().toLowerCase().includes(query.toLowerCase()))
  );

  if (results.length > 0) {
    console.log("\n🔍 Results:");
    results.forEach(r => console.log(r));
  } else {
    console.log("\n⚠️ No results found.");
  }
}

// Ask for input
rl.question("Enter name, ID, or department: ", answer => {
  searchFaculty(answer);
  rl.close();
});
