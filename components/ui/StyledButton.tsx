import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/colors';
export interface Props {
  title?: string;
  children?: React.ReactNode;
  onPress?: () => void;
}

export const StyledButton: React.FC<Props> = ({ title, children, onPress }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed && Platform.OS === 'ios'
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary[600] }}
      >
        <Text style={styles.buttonText}>{title || children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary[500],
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
