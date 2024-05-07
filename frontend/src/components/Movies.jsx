import React, { useState, useContext, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { arrayRemove, arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

import { UserAuth } from "../context/AuthContext";
import useLocalStorageState from "../context/useLocalStorage";
import { createImageUrl } from "../services/movies";

const LikedMoviesContext = React.createContext();

const Movies = ({ movie }) => {
    const [like, setLike] = useState(false);
    const { user } = UserAuth();
    const { likedMovies, setLikedMovies } = useContext(LikedMoviesContext);

    const { title, backdrop_path, poster_path } = movie;

    useEffect(() => {
        const fetchMovies = async () => {
            if (user) {
                onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
                    if (doc.data()) {
                        const userData = doc.data();
                        setLikedMovies(userData.faveShows ?? []);
                    } else {
                        setLikedMovies([]);
                    }
                });
            } else {
                setLikedMovies([]); // Clear liked movies when user is not authenticated
            }
        };
        fetchMovies();
    }, [user, setLikedMovies]);

    const markFave = async () => {
        const userEmail = user?.email;

        if (!userEmail) {
            alert("Please log in to add the movie to favorites");
            return;
        }

        const userDoc = doc(db, "users", userEmail);

        const isLiked = likedMovies.some(
            (likedMovie) => likedMovie.id === movie.id
        );

        try {
            if (isLiked) {
                await updateDoc(userDoc, {
                    faveShows: arrayRemove(movie),
                });
                setLikedMovies((prevLikedMovies) =>
                    prevLikedMovies.filter(
                        (likedMovie) => likedMovie.id !== movie.id
                    )
                );
            } else {
                await updateDoc(userDoc, {
                    faveShows: arrayUnion({ ...movie }),
                });
                setLikedMovies((prevLikedMovies) => [
                    ...prevLikedMovies,
                    movie,
                ]);
            }
            setLike(!like);
        } catch (error) {
            console.error("Error updating liked movies:", error);
        }
    };

    return (
        <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
            <img
                src={createImageUrl(backdrop_path ?? poster_path, "w500")}
                className="w-full h-40 object-cover object-top relative"
                alt=""
            />
            <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                    {title}
                </p>
                <p onClick={markFave} className="cursor-pointer">
                    {likedMovies &&
                    likedMovies.some(
                        (likedMovie) => likedMovie.id === movie.id
                    ) ? (
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
    );
};

const MoviesWithContext = (props) => {
    const [likedMovies, setLikedMovies] = useLocalStorageState(
        "likedMovies",
        []
    );

    return (
        <LikedMoviesContext.Provider value={{ likedMovies, setLikedMovies }}>
            <Movies {...props} />
        </LikedMoviesContext.Provider>
    );
};

export default MoviesWithContext;
