import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export const Title: React.FC<Props> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
  },
});
