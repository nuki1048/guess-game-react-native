import React, { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import StartGameScreen from './screens/StartGameScreen';
import { GameScreen } from './screens/GameScreen';
import Colors from './constants/colors';
import { GameOverScreen } from './screens/GameOverScreen';
const backgounround = require('./assets/images/background.png');

export enum Screens {
  StartGame,
  GameScreen,
  GameOver,
}

export default function App() {
  const [screen, setScreen] = useState<Screens>(Screens.StartGame);
  const [attempts, setAttempts] = useState<number>(0);
  const [number, setNumber] = useState<number | null>(null);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const onSubmitNumber = (num: number) => {
    setNumber(num);

    setScreen(Screens.GameScreen);
  };

  const handleStartNewGame = () => {
    setScreen(Screens.StartGame);
    setNumber(null);
    setAttempts(0);
  };

  const renderScreen = (screen: Screens) => {
    switch (screen) {
      case Screens.StartGame:
        return <StartGameScreen onSubmit={onSubmitNumber} />;
      case Screens.GameScreen:
        return <GameScreen number={number} setGameOver={setGameOver} />;
      case Screens.GameOver:
        return (
          <GameOverScreen
            roundNumber={attempts}
            userNumber={number || 0}
            onStartNewGame={handleStartNewGame}
          />
        );
    }
  };

  const setGameOver = (number: number) => {
    setScreen(Screens.GameOver);
    setAttempts(number);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary[700], Colors.accent[500]]}
      style={styles.container}
    >
      <ImageBackground
        source={backgounround}
        resizeMode='cover'
        style={styles.container}
        imageStyle={styles.imageBackground}
      >
        <SafeAreaView style={styles.container}>
          {renderScreen(screen)}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    opacity: 0.15,
  },
});
