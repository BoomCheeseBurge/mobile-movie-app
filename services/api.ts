// TMDB Configuration
export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        // Inform the acceptable data
        accept: 'application/json',
        // Auth header
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}


export const fetchMovies = async ({ query } : { query: string }) => {

    // Targeted API endpoint
    // Consider the query search for finding movies if any
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : 
        `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    // Get the response
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    // Check if the response is empty
    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch movies', response.statusText);
    } 

    // Get the transformed data
    const data = await response.json();

    // Return the movie results
    return data.results;
}
