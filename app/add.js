import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
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
      ranking: parseInt(movieRanking),
    };

    await db.runAsync(
      'INSERT INTO movies (name, year, actors, imageUrl, ranking) VALUES (?, ?, ?, ?, ?)',
      [movieName, movieYear, movieActors, movieImageUrl, parseInt(movieRanking)]
    );

    setMovieName('');
    setMovieYear('');
    setMovieActors('');
    setMovieImageUrl('');
    setMovieRanking('');
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
        title="Add Movie"
        onPress={addMovie}
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
