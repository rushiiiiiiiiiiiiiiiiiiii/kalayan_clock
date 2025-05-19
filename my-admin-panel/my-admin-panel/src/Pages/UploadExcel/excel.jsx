import React, { useState } from "react";
import styles from "./ExcelUpload.module.css";
import { API_ENDPOINTS } from "../../config";

const ExcelUpload = () => {
  const [csvData, setCsvData] = useState([]);
  const [msg, setMsg] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;

      const rows = text.split("\n").filter(row => row.trim() !== "");
      const delimiter = text.includes("\t") ? "\t" : ","; // Detect tab or comma
      const headers = rows[0].split(delimiter).map(h => h.trim());

      const data = rows.slice(1).map((row) => {
        const values = row.split(delimiter);
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = values[i]?.trim();
        });
        return obj;
      });

      setCsvData(data);
      console.log("Parsed Data:", data);
    };

    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!csvData.length) {
      alert("Please select a CSV/TSV file first.");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.UPLOAD_CSV, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: csvData }),
      });
      console.log(csvData)
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setMsg("✅ " + result.message);
      } else {
        const errorData = await response.json();
        setMsg("❌ " + (errorData.message || "Upload failed."));
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      setMsg("⚠️ Error uploading data.");
    }
  };

  return (
    <div className="w-full items-center flex flex-col p-6">
      <div className={styles.uploadCard}>
        <h3 className="text-xl font-semibold mb-4">Upload CSV/TSV File</h3>
        <input
          type="file"
          accept=".csv,.tsv,.txt"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Upload
        </button>
      </div>
      {msg && <p className="mt-5 text-center text-sm">{msg}</p>}
    </div>
  );
};

export default ExcelUpload;
