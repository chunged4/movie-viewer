import React, { useState, useEffect } from "react";

import axios from "axios";

import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

import { UserAuth } from "../context/AuthContext";
import { createImageUrl } from "../services/movies";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RecommendedMovies = ({ likedMovies }) => {
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    const { user } = UserAuth();

    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            try {
                if (likedMovies.length > 0) {
                    const response = await axios.get(
                        "http://localhost:5000/profile"
                    );
                    setRecommendedMovies(response.data.movies);
                }
            } catch (error) {
                console.error("Error fetching recommended movies", error);
            }
        };
        fetchRecommendedMovies();
    }, [likedMovies]);

    const markFave = async (movie) => {
        const userEmail = user?.email;

        if (userEmail) {
            const userDoc = doc(db, "users", userEmail);
            const isLiked = likedMovies.some(likedMovie => likedMovie.id === movie.id);
            if (!isLiked) {
                await updateDoc(userDoc, {
                    faveShows: arrayUnion({ ...movie }),
                });
            }
        } else {
            alert("Please log in to add the movie to favorites");
        }
    };

    const slide = (offset) => {
        const slider = document.getElementById("recommended-movies-slider");
        slider.scrollLeft += offset;
    };

    return (
        <div>
            <h2 className="font-nsans-bold md:text-x1 p-4">
                Based on your Favorites:
            </h2>
            <div className="flex items-center group">
                <MdChevronLeft
                    size={40}
                    className="bg-white rounded-full absolute left-2 hidden opacity-80 text-gray-700 z-10 group-hover:block cursor-pointer"
                    onClick={() => slide(-500)}
                />
                <div
                    id={`recommended-movies-slider`}
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                >
                    {recommendedMovies.map((movie, index) => (
                        <div
                            key={index}
                            className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 relative"
                        >
                            <img
                                src={createImageUrl(
                                    movie.backdrop_path ?? movie.poster_path,
                                    "w500"
                                )}
                                alt={movie.title}
                                className="w-full h-40 object-cover object-top relative"
                            />
                            <div
                                id={`title-${index}`}
                                className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100"
                            >
                                <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                                    {movie.title}
                                </p>
                                <p
                                    onClick={() => markFave(movie)}
                                    className="cursor-pointer"
                                >
                                    {likedMovies.some(likedMovie => likedMovie.id === movie.id) ? (
                                        <FaHeart
                                            size={20}
                                            className="absolute top-2 left-2 text-gray-300"
                                        />
                                    ) : (
                                        <FaRegHeart
                                            size={20}
                                            className="absolute top-2 left-2 text-gray-300"
                                        />
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <MdChevronRight
                    size={40}
                    className="bg-white rounded-full absolute right-2 hidden opacity-80 text-gray-700 z-10 group-hover:block cursor-pointer"
                    onClick={() => slide(500)}
                />
            </div>
        </div>
    );
};

export default RecommendedMovies;
