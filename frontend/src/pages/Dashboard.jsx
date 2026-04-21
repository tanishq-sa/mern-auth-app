import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleConfirm = () => {
    if (selectedStyle) {
      setConfirmed(true);
      setTimeout(() => setConfirmed(false), 2000);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Nav */}
      <nav className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-bold text-text-primary">Mern Auth</p>
            </div>
          </div>
          <button
            id="logout-btn"
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-hover cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-12 animate-fadeIn">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Product Image Area */}
          <div className="relative bg-hover p-8 flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="w-48 h-48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Shirt SVG */}
              <path
                d="M60 60 L80 40 L100 50 L120 40 L140 60 L160 70 L150 100 L140 95 L140 160 L60 160 L60 95 L50 100 L40 70 Z"
                fill={selectedStyle === "tuxedo" ? "#1a1a1a" : "#333333"}
                stroke="#444444"
                strokeWidth="2"
              />
              {/* Collar */}
              <path
                d="M80 40 L100 55 L120 40"
                fill="none"
                stroke="#555555"
                strokeWidth="2"
              />
              {selectedStyle === "tuxedo" && (
                <>
                  {/* Tuxedo Lapels */}
                  <path
                    d="M85 55 L95 90 L100 70 L105 90 L115 55"
                    fill="none"
                    stroke="#555555"
                    strokeWidth="1.5"
                  />
                  {/* Bow tie */}
                  <ellipse
                    cx="100"
                    cy="60"
                    rx="8"
                    ry="4"
                    fill="#555555"
                  />
                  {/* Buttons */}
                  <circle cx="100" cy="100" r="2" fill="#555555" />
                  <circle cx="100" cy="115" r="2" fill="#555555" />
                  <circle cx="100" cy="130" r="2" fill="#555555" />
                </>
              )}
              {selectedStyle === "normal" && (
                <>
                  {/* Regular collar detail */}
                  <path
                    d="M90 50 L100 65 L110 50"
                    fill="none"
                    stroke="#555555"
                    strokeWidth="1.5"
                  />
                  {/* Buttons */}
                  <circle cx="100" cy="80" r="2" fill="#555555" />
                  <circle cx="100" cy="95" r="2" fill="#555555" />
                  <circle cx="100" cy="110" r="2" fill="#555555" />
                  <circle cx="100" cy="125" r="2" fill="#555555" />
                </>
              )}
            </svg>

            {/* Style badge */}
            {selectedStyle && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-card border border-border">
                <span className="text-xs text-text-secondary capitalize">
                  {selectedStyle}
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-1">
              Choose your style
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Select your preferred shirt style to continue
            </p>

            {/* Style Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                id="style-normal"
                onClick={() => {
                  setSelectedStyle("normal");
                  setConfirmed(false);
                }}
                className={`py-3 px-4 rounded-lg text-sm font-medium border cursor-pointer
                  ${
                    selectedStyle === "normal"
                      ? "bg-accent text-bg border-accent"
                      : "bg-bg text-text-secondary border-border hover:border-text-secondary hover:text-text-primary"
                  }
                `}
              >
                Normal
              </button>
              <button
                id="style-tuxedo"
                onClick={() => {
                  setSelectedStyle("tuxedo");
                  setConfirmed(false);
                }}
                className={`py-3 px-4 rounded-lg text-sm font-medium border cursor-pointer
                  ${
                    selectedStyle === "tuxedo"
                      ? "bg-accent text-bg border-accent"
                      : "bg-bg text-text-secondary border-border hover:border-text-secondary hover:text-text-primary"
                  }
                `}
              >
                Tuxedo
              </button>
            </div>

            {/* Confirm Button */}
            <button
              id="confirm-btn"
              onClick={handleConfirm}
              disabled={!selectedStyle}
              className={`w-full py-3 rounded-lg text-sm font-medium border cursor-pointer
                ${
                  selectedStyle
                    ? confirmed
                      ? "bg-success/20 text-success border-success/30"
                      : "bg-accent text-bg border-accent hover:bg-text-primary"
                    : "bg-border text-text-secondary border-border cursor-not-allowed"
                }
              `}
            >
              {confirmed ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  Confirmed!
                </span>
              ) : (
                "Confirm Selection"
              )}
            </button>
          </div>
        </div>

        {/* Info card */}
        <div className="mt-4 p-4 bg-card border border-border rounded-xl">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-text-secondary mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            <div>
              <p className="text-sm text-text-secondary">
                This is a demo product selection interface. Choose between
                Normal and Tuxedo styles, then confirm your selection.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
