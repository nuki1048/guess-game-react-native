import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const InstructionText: React.FC<Props> = ({ children, style }) => {
  return <Text style={[styles.instrucionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instrucionText: {
    fontFamily: 'open-sans',
    color: Colors.accent[500],
    fontSize: 24,
  },
});
