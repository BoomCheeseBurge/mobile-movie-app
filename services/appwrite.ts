//  Track the searches made by a user

import { Client, Databases, ID, Query } from 'react-native-appwrite';

// Inform TS that the value always exist
const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// Setup Appwrite client endpoint
const client = new Client()
                .setEndpoint('https://fra.cloud.appwrite.io/v1')
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// Setup Appwrite database
const database = new Databases(client);

export const updateSearchCount = async(query: string, movie: Movie) => {

    try {
        const result = await database.listDocuments(DB_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ]);

        // Check if a record of that search has already been stored
        if (result.documents.length > 0) {  
            
            const existingMovie = result.documents[0];

            // If a document is found, then increment the searchCount field
            await database.updateDocument(
                DB_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            );
        } else {
            // If no document is found, then create a new document in Appwrite database
            await database.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}
