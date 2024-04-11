import React, { useEffect, useState } from "react";
import axios from "axios";

import endpoints, { createImageUrl } from "../services/movies";

const Hero = () => {
    const [movies, setMovies] = useState({});

    useEffect(() => {
        axios.get(endpoints.popular).then((response) => {
            // console.log(response.data);
            const movies = response.data.results;
            const randomMovies =
                movies[Math.floor(Math.random() * movies.length)];
            setMovies(randomMovies);
        });
    }, []);

    const { title, backdrop_path, release_date, overview } = movies;
    const truncate = (str, length) => {
        if (!str) {
            return "";
        }
        return str.length > length ? str.slice(0, length) + "..." : str;
    };

    if (!movies) {
        <div>
            <p>
                <strong>Loading movies...</strong>
            </p>
        </div>;
    }

    return (
        <div className="relative w-full">
            <img
                src={createImageUrl(backdrop_path, "original")}
                className="w-full object-cover"
                alt=""
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute top-[25%] lg:top-[35%] left-0 right-0 px-4 lg:px-8 text-white">
                <h1
                    style={{ fontSize: "2rem" }}
                    className="font-nsans-bold lg:max-w-[950px]"
                >
                    {title}
                </h1>
                <div className="mt-8 mb-4">
                    <button className="border bg-gray-300 text-black py-2 px-5">
                        Play
                    </button>
                    <button className="border border-gray-300 py-2 px-5 ml-4">
                        Watch Later
                    </button>
                </div>
                <p className="text-gray-400 text-md">{release_date}</p>
                <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[900px] text-lg mt-4 text-gray-200">
                    {truncate(overview, 150)}
                </p>
            </div>
        </div>
    );
};

export default Hero;
