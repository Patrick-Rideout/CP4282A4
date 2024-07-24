import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import NavBar from '../components/navbar';
import { useState, useEffect } from 'react';
import { MovieContext } from '../components/MovieContext';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

export default function HomeLayout() {
  const [movie, setMovie] = useState(null);

  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="movies3.db" onInit={initializeDB}>
        <NavBar />
        <MovieContext.Provider value={{ movie, setMovie }}>
          <Slot />
        </MovieContext.Provider>
      </SQLiteProvider>
    </View>
  );
}

async function initializeDB(db) {
  await db.execAsync('PRAGMA journal_mode = "wal";');

//  await db.execAsync('DROP TABLE IF EXISTS movies;');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS movies (
      name TEXT PRIMARY KEY NOT NULL,
      year TEXT NOT NULL,
      actors TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      ranking INTEGER NOT NULL
    );
  `);

  const result = await db.getAllAsync('SELECT * FROM movies');

  if (result.length === 0) {
    await db.runAsync('INSERT INTO movies (name, year, actors, imageUrl, ranking) VALUES (?, ?, ?, ?, ?)', ["Terminator 2", "1991", "Arnold, Linda, Edward", "https://i.etsystatic.com/20512669/r/il/e104cd/2378930469/il_1080xN.2378930469_kozz.jpg", 1]);
    await db.runAsync('INSERT INTO movies (name, year, actors, imageUrl, ranking) VALUES (?, ?, ?, ?, ?)', ["Titanic", "2001", "Leonardo, Meryl, Jeff", "https://i.ebayimg.com/images/g/~w0AAOSwWLBZ6CU3/s-l1200.jpg", 2]);
    await db.runAsync('INSERT INTO movies (name, year, actors, imageUrl, ranking) VALUES (?, ?, ?, ?, ?)', ["Bladerunner 2049", "2001", "Me, Ryan, Gosling", "https://i.ebayimg.com/images/g/SGgAAOSwS8ljBeuq/s-l1600.jpg", 3]);
  }


  const firstRow = await db.getFirstAsync('SELECT * FROM movies WHERE ranking = "3"');
  console.log(firstRow.name, firstRow.year, firstRow.actors, firstRow.imageUrl, firstRow.ranking);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 20,
  },

  text: {
    fontSize: 12,
  },
});
