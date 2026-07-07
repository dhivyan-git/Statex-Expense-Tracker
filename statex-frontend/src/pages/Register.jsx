import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthButton from "../components/auth/AuthButton";

import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        setLoading(true);

        setMessage("");

        setError("");

        try {

            const response = await registerUser({

                name,
                email,
                password,

            });

            if (response.data === "User Registered Successfully") {

                setMessage("Account created successfully!");

                setTimeout(() => {

                    navigate("/login");

                }, 1500);

            }

            else if (response.data === "Email already exists") {

                setError("Email already exists.");

            }

        }

        catch (err) {

            if (err.response) {

                setError(err.response.data);

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

            title="Create Account 🚀"

            subtitle="Create your Statex account and start managing your finances."

        >

            <form

                onSubmit={handleRegister}

                className="space-y-6"

            >

                <AuthInput

                    type="text"

                    placeholder="Full Name"

                    value={name}

                    onChange={(e)=>setName(e.target.value)}

                />

                <AuthInput

                    type="email"

                    placeholder="Email Address"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                />

                <PasswordInput

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                />

                {

                    error && (

                        <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-red-400">

                            {error}

                        </div>

                    )

                }

                {

                    message && (

                        <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-3 text-green-400">

                            {message}

                        </div>

                    )

                }

                <AuthButton

                    type="submit"

                    disabled={loading}

                    title={loading ? "Creating Account..." : "CREATE ACCOUNT"}

                />

            </form>

            <p className="mt-10 text-center text-slate-400">

                Already have an account?

                <Link

                    to="/login"

                    className="ml-2 font-semibold text-blue-500 hover:text-blue-400"

                >

                    Login

                </Link>

            </p>

        </AuthLayout>

    );

}

export default Register;