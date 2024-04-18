import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert } from 'react-native';
import { StyledButton } from '../components/ui/StyledButton';
import Colors from '../constants/colors';
import { Title } from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

interface Props {
  onSubmit: (inputValue: number) => void;
}

const StartGameScreen: React.FC<Props> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChangeValue = (value: string) => {
    const regx = /^[0-9\b]+$/;
    if (value === '' || regx.test(value)) {
      setInputValue(value);
    }
  };

  const handleResetValue = () => {
    setInputValue('');
  };

  const handlePressConfirm = () => {
    const parsedValue = parseInt(inputValue, 10);

    if (isNaN(parsedValue) || parsedValue <= 0 || parsedValue >= 99) {
      Alert.alert('Invalid Number', 'Please enter a valid positive number', [
        {
          text: 'Okay',
          style: 'destructive',
          onPress: handleResetValue,
        },
      ]);
      return;
    }
    onSubmit(parsedValue);
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a number</InstructionText>
        {/* inputMode it's a prop for TextInput which is something similar to type prop in html input  */}
        <TextInput
          style={styles.numberInput}
          inputMode='numeric'
          maxLength={2}
          keyboardType='numeric'
          value={inputValue}
          onChangeText={handleChangeValue}
        />
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }}>
            <StyledButton onPress={handleResetValue}>Reset</StyledButton>
          </View>
          <View style={{ flex: 1 }}>
            <StyledButton onPress={handlePressConfirm}>Confirm</StyledButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },

  numberInput: {
    height: 50,
    width: 50,
    textAlign: 'center',
    fontSize: 32,
    borderBottomColor: Colors.accent[500],
    borderBottomWidth: 2,
    color: Colors.accent[500],
    marginVertical: 8,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
