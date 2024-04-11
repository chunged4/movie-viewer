import React, { useState, useEffect } from "react";

import { db } from "../services/firebase";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

import { UserAuth } from "../context/AuthContext";
import { createImageUrl } from "../services/movies";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const Profile = () => {
    const [movies, setMovies] = useState([]);

    const { user } = UserAuth();

    useEffect(() => {
        const fetchMovies = async () => {
            if (user) {
                onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
                    if (doc.data()) {
                        const userData = doc.data();
                        if (userData.hasOwnProperty("faveShows")) {
                            setMovies(userData.faveShows);
                        } else {
                            setMovies([]);
                        }
                    }
                });
            }
        };
        fetchMovies();
    }, [user]);

    const slide = (offset) => {
        const slider = document.getElementById("slider");
        slider.scrollLeft += offset;
    };

    const handleUnLike = (movie) => async () => {
        const userDoc = doc(db, "users", user.email);
        console.log(movie);

        await updateDoc(userDoc, {
            faveShows: arrayRemove(movie),
        });
    };

    if (!user) {
        return (
            <div>
                <p>Fetching shows...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="w-full h-[600px] relative">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/c1366fb4-3292-4428-9639-b73f25539794/778c38e4-3f42-43f9-899c-0b65e2a1a5b1/US-en-20240408-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="//"
                    className="absolute w-full h-full hidden sm:block object-cover"
                />
                <div className="fixed top-0 left-0 w-full h-screen bg-black/60"></div>
            </div>

            <div className="absolute lg:top-[20%] top-[45%] p-4 md:p-8">
                <h1
                    style={{ fontSize: "2rem" }}
                    className="font-nsans-bold my-2 "
                >
                    My Favorites
                </h1>
                <p className="font-nsans-light text-gray-400 text-lg">
                    {user.email}
                </p>
            </div>

            <h2 className="font-nsans-bold md:text-x1 p-4">Favorite Movies</h2>

            <div className="relative flex items-center group">
                {movies.length > 0 && (
                    <MdChevronLeft
                        size={40}
                        className="bg-white rounded-full absolute left-2 hidden opacity-80 text-gray-700 z-10 group-hover:block cursor-pointer"
                        onClick={() => slide(-500)}
                    />
                )}
                <div
                    id={"slider"}
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                >
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 relative"
                            >
                                <img
                                    src={createImageUrl(
                                        movie.backdrop_path ??
                                            movie.poster_path,
                                        "w500"
                                    )}
                                    alt={movie.title}
                                    className="w-full h-40 object-cover object-top relative"
                                />
                                <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                                    <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                                        {movie.title}
                                    </p>
                                    <p
                                        onClick={handleUnLike(movie)}
                                        className="cursor-pointer"
                                    >
                                        <AiOutlineClose
                                            size={30}
                                            className="absolute top-2 right-2"
                                        />
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center">No Favorites</p>
                    )}
                </div>
                {movies.length > 0 && (
                    <MdChevronRight
                        size={40}
                        className="bg-white rounded-full absolute right-2 hidden opacity-80 text-gray-700 z-10 group-hover:block cursor-pointer"
                        onClick={() => slide(500)}
                    />
                )}
            </div>
        </div>
    );
};

export default Profile;
