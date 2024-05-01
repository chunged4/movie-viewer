import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserAuth } from "../context/AuthContext";

const Login = () => {
    const [remember, setRemember] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, logIn } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await logIn(email, password);
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="w-full h-screen relative overflow-hidden">
            <img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/6cefb2f5-90be-4f57-adc4-f6c3c579273d/c2476f5d-1a1c-4c25-bd7b-77f98812d1a1/US-en-20240401-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                alt="//"
                className="absolute w-full h-full hidden sm:block object-cover"
            />

            <div className="fixed top-0 left-0 w-full h-screen bg-black/60"></div>

            <div className="w-full px-3 py-36 absolute">
                <div className="max-w-[450px] mx-auto bg-black/80 rounded-lg">
                    <div className="max-w-[320px] mx-auto py-16">
                        <h1
                            style={{ fontSize: "2rem" }}
                            className="font-nsans-bold mb-8 text-center"
                        >
                            Login
                        </h1>
                        <form
                            className="w-full flex flex-col py-4"
                            onSubmit={handleSubmit}
                        >
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter an email"
                                autoComplete="email"
                                className="p-3 my-2 bg-gray-700 rounded text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                id="current-password"
                                type="password"
                                placeholder="Enter a password"
                                autoComplete="current-password"
                                className="p-3 my-2 bg-gray-700 rounded text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button className="bg-red-600 hover:bg-red-700 py-3 my-6 rounded font-nsans-bold">
                                Login
                            </button>

                            <div className="flex justify-between items-center text-gray-600">
                                <p>
                                    <input
                                        type="checkbox"
                                        onChange={() => setRemember(!remember)}
                                        className="mr-2"
                                    />
                                    Remember Me
                                </p>

                                <p className="cursor-pointer text-sm">
                                    Need Help?
                                </p>
                            </div>
                            <p className="my-4">
                                <span className="text-gray-600 mr-2">
                                    Don't have an account?
                                </span>
                                <Link to="/signup" className="text-white">
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
