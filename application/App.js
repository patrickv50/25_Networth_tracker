import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { Provider } from 'react-redux';
import BottomNav from './components/BottomNav';
import store from './state/store';
import { ThemeContext } from './ThemeContext';

const theme = {
  dark: {
    name: 'dark',
    bg: '#111111',
    text: '#eee',
    textSecondary: '#777',
    input: '#00020a',
    cardBg: '#080808',
    cardBgSecondary: '#212425',
    green: 'rgb(21,238,108)',
    red: 'rgb(255,42,82)',
    statusBar: 60,
    gradientTo: 'rgba(5,5,10,.95)',
    gradientFrom: 'rgba(0,0,0,0)',
    focusColor: 'rgb(21,238,108)',
  },
  light: {
    name: 'light',
    bg: '#fefefe',
    text: '#050505',
    textSecondary: '#888',
    input: '#f6f6f6',
    cardBg: '#EFEFEF',
    cardBgSecondary: '#EFEFEF',
    green: 'rgb(13,200,90)',
    red: 'rgb(255,42,82)',
    statusBar: 60,
    gradientTo: 'rgba(255,255,255,.95)',
    gradientFrom: 'rgba(255,255,255,0)',
    focusColor: 'rgb(30,180,90)',
  }
}
export default function App() {
  const [currentTheme, setTheme] = useState(theme.light)
  const handleChangeTheme = (x) => {
    if (x === 'light') setTheme(theme.dark)
    else setTheme(theme.light)
  }
  return (
    <>
      <Provider store={store}>
        <ThemeContext.Provider value={currentTheme}>
          <NavigationContainer>
            <BottomNav changeTheme={handleChangeTheme} />
          </NavigationContainer>
        </ThemeContext.Provider>
      </Provider>
    </>
  );
}

