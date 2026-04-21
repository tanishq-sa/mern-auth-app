import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import api from "../services/api";

const Login = () => {
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
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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
      const { data } = await api.post("/login", formData);
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

  const isFormValid = formData.email.trim() && formData.password;

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
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Sign in to your account
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
              id="login-email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="text@example.com"
              error={errors.email}
            />
            <Input
              id="login-password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
              placeholder="Enter your password"
              error={errors.password}
            />

            <button
              id="login-submit"
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
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            id="login-signup-link"
            className="text-text-primary hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
