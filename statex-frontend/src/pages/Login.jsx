import Logo from "../assets/statex-logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthButton from "../components/auth/AuthButton";

import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await loginUser({

                email,
                password,

            });

            localStorage.setItem("token", response.data.token);

            localStorage.setItem("email", email);

            navigate("/dashboard");

        }

        catch (err) {

            if (err.response) {

                setError(err.response.data.message || "Invalid Email or Password");

            }

            else {

                setError("Unable to connect to server.");

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout

            title="Welcome Back "

            subtitle="Login to continue managing your expenses."

        >

            <form

                onSubmit={handleLogin}

                className="space-y-6"

            >

                <AuthInput

                    type="email"

                    placeholder="Email Address"

                    value={email}

                    onChange={(e) => setEmail(e.target.value)}

                />

                <PasswordInput

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                />

                <div className="flex items-center justify-between">

                    <label className="flex items-center gap-2 text-sm text-slate-400">

                 

                    </label>

                   

                </div>

                {

                    error && (

                        <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm">

                            {error}

                        </div>

                    )

                }

                <AuthButton

                    type="submit"

                    title={loading ? "Signing In..." : "LOGIN"}

                    disabled={loading}

                />

            </form>

           

            <p className="mt-10 text-center text-slate-400">

                Don't have an account?

                <Link

                    to="/register"

                    className="ml-2 font-semibold text-blue-500 hover:text-blue-400"

                >

                    Register

                </Link>

            </p>

        </AuthLayout>

    );

}

export default Login;