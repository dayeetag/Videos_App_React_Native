import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen'
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Home' screenOptions = {{headerTitleAlign: 'center'}}>
        <Stack.Screen component = {HomeScreen} name = "Home"></Stack.Screen>
        <Stack.Screen component = {DetailsScreen} name = "Details"></Stack.Screen>
        <Stack.Screen component = {FavoritesScreen} name = "Favorites"></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
