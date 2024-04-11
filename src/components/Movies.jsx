import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

import { createImageUrl } from "../services/movies";

import { UserAuth } from "../context/AuthContext";

const Movies = ({ movie }) => {
    const [like, setLike] = useState(false);

    const { title, backdrop_path, poster_path } = movie;

    const { user } = UserAuth();

    const markFave = async () => {
        const userEmail = user?.email;

        if (userEmail) {
            const userDoc = doc(db, "users", userEmail);
            setLike(!like);
            await updateDoc(userDoc, {
                faveShows: arrayUnion({ ...movie }),
            });
        } else {
            alert("Please log in to add the movie to favorites");
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
                    {like ? (
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

export default Movies;
