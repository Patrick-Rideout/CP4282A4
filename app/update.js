import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
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
      ranking: parseInt(movieRanking),
    };

    await db.runAsync('DELETE FROM movies WHERE name = ?', [movie.name]);
    await db.runAsync(
      'INSERT INTO movies (name, year, actors, imageUrl, ranking) VALUES (?, ?, ?, ?, ?)',
      [movieName, movieYear, movieActors, movieImageUrl, parseInt(movieRanking)]
    );

    setMovie(latestData);
  };

  return (
    <View style={styles.container}>
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
        title="Update"
        onPress={updateMovieInfo}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 250,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 20,
    width: 150,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
