import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import colors from '../style/colors';
import fonts from '../style/fonts';

interface Button extends TouchableOpacityProps {
  title: string,
}

export function Button({ title, ...rest }: Button) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.text}>
        { title }
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.heading
  }
});