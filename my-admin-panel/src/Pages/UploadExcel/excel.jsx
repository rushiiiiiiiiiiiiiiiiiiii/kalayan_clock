import { useState } from "react";
import styles from "./ExcelUpload.module.css";
import { API_ENDPOINTS } from "../../config";

const translations = {
  en: {
    title: "Upload CSV File",
    upload: "Upload",
    selectFile: "Please select a correct CSV file first.",
    success: "✅ Upload successful!",
    fail: "❌ Upload failed.",
    error: "⚠️ Error uploading data.",
    invalidType: "❌ Only CSV file allowed!",
  },
  hi: {
    title: "CSV फ़ाइल अपलोड करें",
    upload: "अपलोड करें",
    selectFile: "कृपया पहले एक CSV फ़ाइल चुनें।",
    success: "✅ सफलतापूर्वक अपलोड!",
    fail: "❌ अपलोड विफल!",
    error: "⚠️ डेटा अपलोड में त्रुटि।",
    invalidType: "❌ केवल CSV फ़ाइल की अनुमति!",
  },
  mr: {
    title: "CSV फाइल अपलोड करा",
    upload: "अपलोड",
    selectFile: "कृपया प्रथम CSV फाइल निवडा.",
    success: "✅ यशस्वी अपलोड!",
    fail: "❌ अपलोड अयशस्वी!",
    error: "⚠️ डेटा अपलोड करताना त्रुटी.",
    invalidType: "❌ फक्त CSV फाइल चालेल!",
  },
};

const ExcelUpload = () => {
  const [csvData, setCsvData] = useState([]);
  const [msg, setMsg] = useState("");
  const [language, setLanguage] = useState("en");

  const t = translations[language];

  /* 📌 ONLY CSV FILE TYPE VALIDATION */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert(t.invalidType);
      setMsg(t.invalidType);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;

      const rows = text.split("\n").filter((r) => r.trim() !== "");
      const delimiter = text.includes("\t") ? "\t" : ",";

      const headers = rows[0].split(delimiter).map((h) => h.trim());

      const data = rows.slice(1).map((row) => {
        const values = row.split(delimiter);
        const obj = {};

        headers.forEach((h, i) => {
          obj[h] = values[i]?.trim();
        });

        return obj;
      });

      alert("📄 File loaded successfully!");
      setMsg("📄 File loaded successfully!");
      setCsvData(data);
    };

    reader.readAsText(file);
  };

  /* 📌 UPLOAD CSV */
  const handleUpload = async () => {
    if (!csvData.length) {
      alert(t.selectFile);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.UPLOAD_CSV, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: csvData, lan: language }),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        const success = "✅ " + (result.message || t.success);
        alert(success);
        setMsg(success);
      } else {
        const failMsg = "❌ " + (result.error || result.message || t.fail);
        alert(failMsg);
        setMsg(failMsg);
      }
    } catch (error) {
      alert(t.error);
      setMsg(t.error);
      console.error(error);
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
          accept=".csv"
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

export default ExcelUpload;
