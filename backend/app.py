import requests
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nlp = spacy.load('en_core_web_sm')

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

liked_movies = []

# Function to fetch popular movies data from TMDB API
def fetch_popular_data(page=1):
    api_key = 'YOUR_API_KEY_HERE'
    url = f'https://api.themoviedb.org/3/movie/popular'
    params = {'api_key': api_key, 'page': page}
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()['results'] 
    else:
        return None

def create_movie_dataset(num_pages=5):
    dataset = []
    for page in range(1, num_pages + 1):
        movies = fetch_popular_data(page)
        if movies:
            dataset.extend(movies)
        else:
            print(f'Error fetching data from page {page}')
    return dataset

def preprocess_text(text):
    doc = nlp(text)
    return ' '.join([token.lemma_ for token in doc if not token.is_stop])

def calculate_similarity(liked_movies, popular_movies):
  liked_genres = []
  liked_titles = []

  for movie in liked_movies:
    liked_genres.extend(movie.get("genre_ids", []))
    liked_titles.append(preprocess_text(movie["title"]))

  popular_genres = []
  popular_titles = []

  for movie in popular_movies:
    popular_genres.extend(movie.get("genre_ids", [])) 
    popular_titles.append(preprocess_text(movie["title"]))

  # Calculate genre similarity using Jaccard similarity
  from collections import Counter
  genre_intersection_counts = Counter(liked_genres) & Counter(popular_genres)
  genre_union_counts = Counter(liked_genres + popular_genres)
  genre_similarities = [float(intersection) / union if union else 0.0 for intersection, union in genre_intersection_counts.items()]

  # Calculate name similarity using cosine similarity after TF-IDF vectorization
  vectorizer = TfidfVectorizer()
  title_vectors = vectorizer.fit_transform(liked_titles + popular_titles)
  name_similarities = cosine_similarity(title_vectors[:len(liked_movies)], title_vectors[len(liked_movies):])

  # Combine genre and name similarities (optional: weigh them differently)
  similarities = [0.5 * genre_sim + 0.5 * name_sim for genre_sim, name_sim in zip(genre_similarities, name_similarities)]
  return np.array(similarities)

def get_recommendations(dataset):
    global liked_movies
    similarity_scores = calculate_similarity(liked_movies, dataset)

    sorted_indices = similarity_scores.argsort(axis=1)[:, ::-1]
    recommendations = []
    recommended_ids = set() 
    count = 0 

    for i in range(len(liked_movies)):
        if i < len(sorted_indices):
            indices = sorted_indices[i]
            numeric_indices = [idx for idx in indices if isinstance(idx, (int, np.integer))]
            recommended_indices = [int(idx) for idx in numeric_indices if dataset[int(idx)]['id'] not in [movie['id'] for movie in liked_movies]]
            
            # Add unique recommendations that are not in the liked list
            for idx in recommended_indices:
                if dataset[idx]['id'] not in recommended_ids and count < 20:
                    recommended_ids.add(dataset[idx]['id'])
                    recommendations.append(dataset[idx])
                    count += 1
                elif count >= 20:
                    break 

    return recommendations

@app.route('/profile', methods=['POST'])
def fetch_liked_movies():
    global liked_movies
    data = request.json
    liked_movies = data.get('movies')

    return jsonify({'message': 'Liked movies updated successfully'})

@app.route('/profile', methods=['GET'])
def send_recommendations():
    dataset = create_movie_dataset()
    recommendations = get_recommendations(dataset)
    filtered_recommendations = [movie for movie in recommendations if movie not in liked_movies]
    return jsonify({'movies': filtered_recommendations})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)