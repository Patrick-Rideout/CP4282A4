import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Movie from '../components/movie';
import { MovieContext } from '../components/MovieContext';
import { useSQLiteContext } from 'expo-sqlite';
import Button from '../components/button';

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

//    if (rankings.length > 0) {
//      setMovie(rankings[0]);
//      setCurrentIndex(0);
//    }
  };

  const goToNextLowestRanking = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < rankings.length) {
      setMovie(rankings[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  if (movie == null) {
    return (
      <Text>Loading</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Movie movie={movie} />
      <View style={styles.buttonContainer}>
        <Button label={"<"} onPress={goToNextHighestRanking} />
        <Button label={">"} onPress={goToNextLowestRanking} />
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
  }
});
