import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const search = () => {

	const [searchQuery, setSearchQuery] = useState('');

	// Initialize the useFetch hook
	const { 
		data: movies, 
		loading, 
		error, 
		refetch: loadMovies, 
		reset, 
	} = useFetch(() => fetchMovies({
			query: searchQuery
		}), false
	);

	// Call every time search term changes
	useEffect(() => {

		// Set debounce to prevent 
		// Wrap inside async
		const timeoutId = setTimeout(async() => {

			if (searchQuery.trim()) {
				await loadMovies();

				// Check if the search result is found
				if (movies?.length! > 0 && movies?.[0]) {
					
					await updateSearchCount(searchQuery, movies[0]);
				}
			} else {
				reset();
			}
		}, 500);
	
		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

	return (
		<View className='flex-1 bg-primary'>
			<Image source={images.bg} className='flex-1 absolute w-full z-0' />

			<FlatList 
				data={movies} 
				renderItem={({ item }) => <MovieCard {... item} />} 
				keyExtractor={(item) => item.id.toString()}
				className='px-5'
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: 'center',
					gap: 16,
					marginVertical: 16,
				}}
				contentContainerStyle={{ paddingBottom: 100 }}
				// Display search bar at the top of the flatlist
				ListHeaderComponent={
					<>
						<View className='w-full flex-row justify-center mt-20 items-center'>
							<Image source={icons.logo} className='w-12 h-10' />
						</View>

						<View className='my-5'>
							<SearchBar 
								placeholder='Search movies...'  
								value={searchQuery}
								onChangeText={(text: string) => setSearchQuery(text)}
							/>
						</View>

						{/* Show that the movies are being loaded */}
						{loading && (
							<ActivityIndicator size="large" color="#0000ff" />
						)}

						{/* Show error message if any */}
						{error && (
							<Text className="text-red-500 px-5 my-3">
								Error: {error.message}
							</Text>
						)}

						{/* Info on found movies */}
						{!loading && !error && searchQuery.trim() && movies?.length > 0 && (

							<Text className='text-xl text-white font-bold'>
								Search Results for{' '}
								<Text className='text-accent'>{searchQuery}</Text>
							</Text>
						)}
					</>
				}
				ListEmptyComponent={
					!loading && !error ? (
						<View className='mt-10 px-5'>
							<Text className='text-center text-gray-500'>
								{searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
							</Text>
						</View>
					) : null
				}
			/>
		</View>
	);
}

export default search;