import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from './components/BottomNav';
import store from './state/store';
// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <BottomNav />
        </NavigationContainer>
      </Provider>
    </>
  );
}

