import { Image, Text } from 'react-native';

export default function Movie({ movie }) {
  return (
    <>
      <Text>{movie.name}</Text>
      <Image source={{ uri: movie.imageUrl }} style={{ width: 250, height: 400 }} />
      <Text>{movie.year}</Text>
      {movie.actors.split(',').map((actor) => {
        return <Text key={actor}>{actor}</Text>;
      })}
      <Text>Ranking: {movie.ranking}</Text>
    </>
  );
}


