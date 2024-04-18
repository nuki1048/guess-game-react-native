import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Title } from '../components/ui/Title';
import Colors from '../constants/colors';
import { StyledButton } from '../components/ui/StyledButton';
const gameOverImage = require('../assets/images/success.png');

export const GameOverScreen: React.FC<{
  roundNumber: number;
  userNumber: number;
  onStartNewGame: () => void;
}> = ({ onStartNewGame, roundNumber, userNumber }) => {
  return (
    <View style={styles.container}>
      <Title>Game Over!</Title>
      <View style={styles.imageContainer}>
        <Image source={gameOverImage} style={styles.image} />
      </View>
      {/* When we adding another text into the Text component all of the styles gonna be inherited from parent */}
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundNumber}</Text>{' '}
        rounds to guess the number{' '}
        <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
      <StyledButton onPress={onStartNewGame}>Start New Game</StyledButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary[800],
    // In react native to create a circle with borderRadius we need to divide our width and hight by 2
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary[500],
  },
});
