import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from './components/BottomNav';
// const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <>
      <NavigationContainer>
        <BottomNav  />
      </NavigationContainer>
    </>
  );
}

