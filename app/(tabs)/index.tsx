import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {

	const router = useRouter();

	// Initialize the useFetch hook
	const { 
		data: movies, 
		loading: moviesLoading, 
		error: moviesError
	} = useFetch(() => fetchMovies({
			query: ''
		})
	);

	return (
		<View
		className="flex-1 bg-primary"
		>
			<Image source={images.bg}
				className="absolute w-full z-0"
			></Image>

			<ScrollView className="flex-1 px-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
			>
				<Image source={icons.logo} 
					className="w-12 h-10 mt-20 mb-5 mx-auto" 
				/>

				{moviesLoading ? (
					// Show loading indicator when movies are being fetched
					<ActivityIndicator 
						size="large"
						color="#0000ff"
						className="mt-10 self-center"
					/>

				) : moviesError ? (
					// Handle error messages gracefully
					<Text>Error: {moviesError?.message}</Text>

				) :	(
					<View className="flex-1 mt-5">
						{/* Else the movies are fetched successfully */}
						<>
							{/* Page Title */}
							<Text className="text-lg text-white font-bold mt-5 mb-3" 
							>
								Latest Movies
							</Text>

							{/* Movies Result */}
							<FlatList 
								data={movies}
								renderItem={({ item }) => (
									<MovieCard 
										{... item}
									/>
								)}
								keyExtractor={(item) => item.id.toString()}
								numColumns={3}
								columnWrapperStyle={{
									justifyContent: 'flex-start',
									gap: 20,
									paddingRight: 5,
									marginBottom: 10
								}}
								className="mt-2 pb-32"
								scrollEnabled={false}
							/>
						</>
					</View>
				)}

			</ScrollView>
		</View>
	);
}
