import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
    return (
        // Makes the card inside this link component to be clickable
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                {/* Show Movie Poster */}
                <Image 
                    source={{
                        uri: poster_path 
                            ? `https://image.tmdb.org/t/p/w500${poster_path}` 
                            : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />

                {/* Show Movie Title */}
                <Text numberOfLines={1} className="text-sm font-bold text-white mt-2">
                    {title}
                </Text>

                {/* Show Movie Rating */}
                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-4" />

                    <Text className="text-xs text-white font-bold uppercase">{Math.round(vote_average/2)}</Text>
                </View>

                {/* Released Movie Year */}
                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {release_date?.split('-')[0]}
                    </Text>

                    {/* Type in case there will be TV shows added */}
                    <Text className="text-xs font-medium text-light-300 uppercase">
                        Movie
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

export default MovieCard;