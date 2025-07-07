import React, { useState } from "react";

import { BASE_URL } from "../../config";

const translations = {
  en: {
    title: "Upload CSV/TSV File",
    upload: "Upload",
    selectFile: "Please select a CSV/TSV file first.",
    success: "✅ Upload successful!",
    fail: "❌ Upload failed.",
    error: "⚠️ Error uploading data.",
  },
  hi: {
    title: "CSV/TSV फ़ाइल अपलोड करें",
    upload: "अपलोड करें",
    selectFile: "कृपया पहले एक CSV/TSV फ़ाइल चुनें।",
    success: "✅ सफलतापूर्वक अपलोड किया गया!",
    fail: "❌ अपलोड विफल रहा।",
    error: "⚠️ डेटा अपलोड करने में त्रुटि।",
  },
  mr: {
    title: "CSV/TSV फाइल अपलोड करा",
    upload: "अपलोड करा",
    selectFile: "कृपया प्रथम CSV/TSV फाइल निवडा.",
    success: "✅ यशस्वीरित्या अपलोड झाले!",
    fail: "❌ अपलोड अयशस्वी.",
    error: "⚠️ डेटा अपलोड करताना त्रुटी.",
  },
};

const UploadPlanet = () => {
  const [csvData, setCsvData] = useState([]);
  const [msg, setMsg] = useState("");
  const [language, setLanguage] = useState("en");

  const t = translations[language]; // current language strings

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;

      const rows = text.split("\n").filter(row => row.trim() !== "");
      const delimiter = text.includes("\t") ? "\t" : ",";
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
      alert(t.selectFile);
      return;
    }

    try {
      const response = await fetch(BASE_URL+"/add-nakshatra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: csvData,lan:language }),
      });

      if (response.ok) {
        const result = await response.json();
        setMsg("✅ " + result.message || t.success);
      } else {
        const errorData = await response.json();
        setMsg("❌ " + (errorData.message || t.fail));
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      setMsg(t.error);
    }
  };

  return (
    <div className="w-full items-center flex flex-col p-6">
      <div className="mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>
      </div>
      <div className={styles.uploadCard}>
        <h3 className="text-xl font-semibold mb-4">{t.title}</h3>
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
          {t.upload}
        </button>
      </div>
      {msg && <p className="mt-5 text-center text-sm">{msg}</p>}
    </div>
  );
};

export default UploadPlanet;
