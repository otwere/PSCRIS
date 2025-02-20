import React, { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const backgroundImages = ["https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80"];
export const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    login,
    user
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate("/");
    } catch (err) {
      if (credentials.username !== "admin" || credentials.password !== "admin") {
        setError("Please use username: admin, password: admin");
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };
  return <div className="relative min-h-screen w-full flex items-center justify-center">
      <div className="fixed inset-0 z-0">
        {backgroundImages.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`} style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} />)}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <Shield className="h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Welcome to PCRIS</h1>
          <p className="text-gray-600">
            Police Crime Reporting Information System
          </p>
          <p className="text-sm text-blue-600 mt-2">Use admin/admin to login</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Username
            </label>
            <input type="text" value={credentials.username} onChange={e => setCredentials(prev => ({
            ...prev,
            username: e.target.value
          }))} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="admin" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Password
            </label>
            <input type="password" value={credentials.password} onChange={e => setCredentials(prev => ({
            ...prev,
            password: e.target.value
          }))} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="admin" required />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </form>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {backgroundImages.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/75"}`} />)}
      </div>
    </div>;
};