import { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export default function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("http://127.0.0.1:8000/generate-chart", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setData(res.data);
    setSelectedColumn(""); // reset selected column
  };

  const handleColumnSelect = (col) => {
    setSelectedColumn(col);
  };

  const getChartData = () => {
    if (!selectedColumn || !data) return null;
    return data.data.map((row) => row[selectedColumn]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">SQL-to-Chart Generator</h1>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload & Preview
      </button>

      {data && (
        <div className="mt-6 bg-white shadow-md rounded p-4 w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-2">Preview:</h2>
          <pre className="overflow-x-auto text-sm mb-4">
            {JSON.stringify(data, null, 2)}
          </pre>

          <h3 className="text-lg font-semibold mb-2">Select Column to Chart:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.columns.map((col) => (
              <button
                key={col}
                onClick={() => handleColumnSelect(col)}
                className={`px-3 py-1 rounded ${
                  selectedColumn === col ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {col}
              </button>
            ))}
          </div>

          {selectedColumn && (
            <Plot
              data={[
                {
                  x: Array.from({ length: getChartData().length }, (_, i) => i + 1),
                  y: getChartData(),
                  type: "bar",
                  marker: { color: "blue" },
                },
              ]}
              layout={{ title: `Bar Chart of ${selectedColumn}` }}
              className="w-full"
            />
          )}
        </div>
      )}
    </div>
  );
}
