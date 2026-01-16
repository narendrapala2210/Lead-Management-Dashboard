import { useEffect, useState } from "react";
// packages
import { useNavigate, Navigate } from "react-router-dom";
// icons
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
// hooks
import useAuth from "../hooks/useAuth";
//
import auth from "../api/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "admin@test.com",
    password: "Test@123",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, handleLogin } = useAuth();

  //
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    handleLogin();
  }, [handleLogin]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await auth.login(formData);
      if (data.status) {
        localStorage.setItem("token", data.token);
        handleLogin();
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err: unknown) {
      console.log(err);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-grey flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Login Form */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          {/* header */}
          <div className="text-center mb-2">
            <h1 className="text-xl font-bold text-foreground">
              Welcome to Lead Dashboard
            </h1>
            <small className="text-muted-foreground mt-2">
              Sign in to manage your leads
            </small>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChangeFormData}
                  placeholder="admin@test.com"
                  className="input-search"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChangeFormData}
                  placeholder="••••••••"
                  className="input-search"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
