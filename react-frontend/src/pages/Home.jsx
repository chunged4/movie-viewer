import React from "react";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import endpoints from "../services/movies";

const Home = () => {
    return (
        <div>
            <Hero />
            <div>
                <Categories title="popular" url={endpoints.popular} />
                <Categories title="top rated" url={endpoints.topRated} />
                <Categories title="trending" url={endpoints.trending} />
                <Categories title="comedy" url={endpoints.comedy} />
                <Categories title="upcoming" url={endpoints.upcoming} />
            </div>
        </div>
    );
};

export default Home;
