# Movie Recommender Setup Guide

## Background

This project is a movie recommender system that utilizes the TMDB API. The frontend is developed using React, while the backend is powered by Python Flask.

## Setting Up

### 1. Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/chunged4/movie-viewer.git
```

### 2. Frontend Setup

Naviagate to the frontend directory and install the required dependencies:

```bash
cd frontend
npm install
```

### 3. Firebase Configuration

Create a Firebase database and obtain the FirebaseSDK snippet. Paset the snippet into a file named `fiirebase.js` under this directory: `frontend/src/services`

### 4. TMDB API Configuration

Create a `movies.js` file in the `services` folder. Include your TMDB API key and define the API endpoints as follows:

```
const baseURL = "https://api.themoviedb.org/3";
const endpoints = {
    popular: `${baseURL}/movie/popular?api_key=${key}`,
    topRated: `${baseURL}/movie/top_rated?api_key=${key}`,
    trending: `${baseURL}/movie/popular?api_key=${key}&language=en-US&page=2`,
    comedy: `${baseURL}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
    upcoming: `${baseURL}/movie/upcoming?api_key=${key}`,
};

export const createImageUrl = (filename, size) => {
    return `https://image.tmdb.org/t/p/${size}/${filename}`;
}

export default endpoints;
```

### 5. Backend Setup

Navigate back to the backend directory and create a virtual environment named `venv`:

```bash
python -m venv venv
```
Activate the virtual environment:

* Unix/MacOS:
    ```bash
    source venv/bin/activate
    ```
* Windows:
    ```bash
    vev/Scripts/activate
    ```
To deactive the environment, run `deactivate`.

Install the required Python packages:
```bash
python -m pip install -r requirements.txt
```

### 6. Running the application
Open two separate terminals and execute the following commands:
* Frontend:
    ```bash
    cd frontend
    npm start
    ```
* Backend:
    ```bash
    cd backend
    python app.py
    ```
