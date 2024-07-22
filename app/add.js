import { Text, View, TextInput, StyleSheet } from 'react-native';
import Button from '../components/button';
import { MovieContext } from '../components/MovieContext';
import { useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export default function AddMovie() {
  const db = useSQLiteContext();

  const [movieName, setMovieName] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [movieActors, setMovieActors] = useState('');
  const [movieImageUrl, setMovieImageUrl] = useState('');
  const [movieRanking, setMovieRanking] = useState('');

  const addMovie = async () => {
    const newMovie = {
      name: movieName,
      year: movieYear,
      actors: movieActors,
      imageUrl: movieImageUrl,
      ranking: parseInt(movieRanking)
    };

    await db.runAsync('INSERT INTO movies (name, year, actors, imageUrl, ranking) VALUES (?, ?, ?, ?, ?)', [movieName, movieYear, movieActors, movieImageUrl, parseInt(movieRanking)]);

    setMovieName('');
    setMovieYear('');
    setMovieActors('');
    setMovieImageUrl('');
    setMovieRanking('');
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
        label={"Add Movie"}
        onPress={addMovie}
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
