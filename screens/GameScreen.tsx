import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Title } from '../components/ui/Title';
import { NumberContainer } from '../components/game/NumberContainer';
import { StyledButton } from '../components/ui/StyledButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { GuessLogItem } from '../components/game/GuessLogItem';
let minBoundary = 1;
let maxBoundary = 100;

export const GameScreen: React.FC<{
  number?: number | null;
  setGameOver: (num: number) => void;
}> = ({ number, setGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, number as number);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  function generateRandomBetween(
    min: number,
    max: number,
    exclude: number
  ): number {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return randomNumber;
    }
  }

  function nextGuessHandler(direction: 'lower' | 'greater') {
    if (
      (direction === 'lower' && currentGuess < (number ?? 0)) ||
      (direction === 'greater' && currentGuess > (number ?? 0))
    ) {
      Alert.alert('Dont lie!', 'Your know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((state) => [newRndNumber, ...state]);
  }

  const guessRoundListLength = guessRounds.length;

  useEffect(() => {
    if (number === currentGuess && guessRoundListLength !== 1) {
      setGameOver(guessRoundListLength);
    }
  }, [currentGuess, guessRoundListLength, initialGuess, setGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {/* GUESS COMPONENT */}
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <StyledButton onPress={() => nextGuessHandler('lower')}>
              <Ionicons name='remove-outline' size={24} color='white' />
            </StyledButton>
          </View>
          <View style={styles.buttonContainer}>
            <StyledButton onPress={() => nextGuessHandler('greater')}>
              <Ionicons name='add-outline' size={24} color='white' />
            </StyledButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(info) => (
            <GuessLogItem
              guess={info.item}
              guessRound={guessRoundListLength - info.index}
            />
          )}
          keyExtractor={(item) => `id-${item}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
