import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Dashboard = () => {
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setError("");
        }
    };

    const handleUpload = async () => {
        if (!image) {
            setError("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", image);

        setLoading(true);
        setResponse("");
        setError("");

        try {
            const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.post(`${VITE_BACKEND_URL}/api/v1/data/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResponse(res.data.message);
        } catch (err) {
            setError("Failed to upload image. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-black text-white p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload an Image</h2>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-4"
                />
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded transition ${
                        loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>

                {loading && <div className="mt-4 w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>}
                {error && <p className="mt-4 text-red-500">{error}</p>}
                {response && (
                    <div className="mt-4 p-4 bg-gray-700 rounded text-white">
                        <ReactMarkdown>{response}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
