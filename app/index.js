import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Movie from '../components/movie';
import { MovieContext } from '../components/MovieContext';
import { useSQLiteContext } from 'expo-sqlite';
import { Button } from '@rneui/themed';

export default function App() {
  const db = useSQLiteContext();
  const { movie, setMovie } = useContext(MovieContext);
  const [rankings, setRankings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync('SELECT * FROM movies ORDER BY ranking');
      console.log(result);
      setRankings(result);
      if (result.length > 0) {
        setMovie(result[0]);
      }
    }
    setup();
  }, []);

  const goToNextHighestRanking = () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      setMovie(rankings[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const goToNextLowestRanking = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < rankings.length) {
      setMovie(rankings[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  if (movie == null) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={styles.container}>
      <Movie movie={movie} />
      <View style={styles.buttonContainer}>
        <Button
          title="<"
          onPress={goToNextHighestRanking}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonTitle}
        />
        <Button
          title=">"
          onPress={goToNextLowestRanking}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonContainerStyle: {
    width: 80,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
