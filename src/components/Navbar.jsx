import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="absolute w-full p-4 flex items-center justify-between z-50">
            <Link to="/">
                <h1 className="text-red-600 font-nsans-medium cursor-pointer text-5xl">
                    Movie Viewer
                </h1>
            </Link>

            <section>
                <div className="fixed top-5 right-5 flex items-center gap-x-4">
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

            <Link to="/profile"></Link>
        </div>
    );
};

export default Navbar;
