// navbar.js
import { View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@rneui/themed';

export default function NavBar() {
  const handleHome = () => {
    router.navigate('/');
  };
  const handleUpdate = () => {
    router.navigate('/update');
  };
  const handleAdd = () => {
    router.navigate('/add');
  };

  return (
    <View style={styles.navbar}>
      <Button
        title="Movies"
        onPress={handleHome}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
      />
      <Button
        title="Update"
        onPress={handleUpdate}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
      />
      <Button
        title="Add"
        onPress={handleAdd}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
      />
    </View>
  );
}

const styles = {
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonContainer: {
    width: '30%', // Adjust the width as needed
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
