import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';

interface Props {
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 36,
    borderRadius: 8,
    marginHorizontal: 24,
    backgroundColor: Colors.primary[800],
    elevation: 4,
    shadowColor: 'black',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    // If we wanted to show a shadow on both platform we should use elevation for android and shadow(Color|Offset|Radius|Opacity) for IOS.
  },
});
