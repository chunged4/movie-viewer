import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logOut } = UserAuth();

    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="absolute w-full p-4 flex items-center justify-between z-50">
            <h1 className="text-red-600 font-nsans-medium cursor-pointer text-5xl">
                Movie Viewer
            </h1>

            {user?.email ? (
                <section>
                    <div className="fixed top-5 right-5 flex items-center gap-x-4">
                        <Link to="/">
                            <button className="cursor-pointer">Home</button>
                        </Link>
                        <Link to="/profile">
                            <button className="cursor-pointer">Profile</button>
                        </Link>
                        <button
                            onClick={handleLogOut}
                            className="bg-red-600 px-6 py-1 rounded cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </section>
            ) : (
                <section>
                    <div className="fixed top-5 right-5 flex items-center gap-x-4">
                        <Link to="/">
                            <button className="cursor-pointer">Home</button>
                        </Link>
                        <Link to="/login">
                            <button className="cursor-pointer">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-red-600 px-6 py-1 rounded cursor-pointer">
                                Signup
                            </button>
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Navbar;
