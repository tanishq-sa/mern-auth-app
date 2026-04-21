import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import api from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const { data } = await api.post("/signup", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border mb-4">
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Enter your details to get started
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-xl p-6">
          {serverError && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-error/10 border border-error/20 animate-shake">
              <p className="text-sm text-error">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <Input
              id="signup-name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange("name")}
              placeholder="Test"
              error={errors.name}
            />
            <Input
              id="signup-email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="test@example.com"
              error={errors.email}
            />
            <Input
              id="signup-password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
              placeholder="Min. 6 characters"
              error={errors.password}
            />

            <button
              id="signup-submit"
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full mt-2 py-3 rounded-lg text-sm font-medium tracking-wide border
                ${
                  isFormValid && !loading
                    ? "bg-accent text-bg border-accent hover:bg-text-primary cursor-pointer"
                    : "bg-border text-text-secondary border-border cursor-not-allowed"
                }
              `}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            id="signup-login-link"
            className="text-text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
