import { Text, Pressable, View, TextInput, StyleSheet } from 'react-native';
import Button from '../components/button';
import { MovieContext } from '../components/MovieContext';
import { useContext, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export default function Page() {
  const db = useSQLiteContext();
  const { movie, setMovie } = useContext(MovieContext);

  const [movieName, setMovieName] = useState(movie.name);
  const [movieYear, setMovieYear] = useState(movie.year);
  const [movieActors, setMovieActors] = useState(movie.actors);
  const [movieImageUrl, setMovieImageUrl] = useState(movie.imageUrl);
  const [movieRanking, setMovieRanking] = useState(movie.ranking.toString());

  const updateMovieInfo = async () => {
    const latestData = {
      name: movieName,
      year: movieYear,
      actors: movieActors,
      imageUrl: movieImageUrl,
      ranking: parseInt(movieRanking)
    };

    await db.runAsync('DELETE FROM movies WHERE name = ?', [movie.name]);
    await db.runAsync('INSERT INTO movies (name, year, actors, imageUrl, ranking) VALUES (?, ?, ?, ?, ?)', [movieName, movieYear, movieActors, movieImageUrl, parseInt(movieRanking)]);

    setMovie(latestData);
  };

  return (
    <>
      <Text>Movie Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMovieName}
        value={movieName}
      />
      <Text>Movie Year</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMovieYear}
        value={movieYear}
      />
      <Text>Movie Actors</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMovieActors}
        value={movieActors}
      />
      <Text>Movie Image URL</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMovieImageUrl}
        value={movieImageUrl}
      />
      <Text>Movie Ranking</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMovieRanking}
        value={movieRanking}
        keyboardType="numeric"
      />
      <Button
        label={"Update"}
        onPress={updateMovieInfo}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
