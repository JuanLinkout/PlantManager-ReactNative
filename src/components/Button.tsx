import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import colors from '../style/colors';

interface Button extends TouchableOpacityProps {
  title: string,
}

export function Button({ title, ...rest }: Button) {
  return (
    <TouchableOpacity style={styles.button} {...rest} activeOpacity={0.5}>
        <Text style={styles.buttonText}>
          { title }
        </Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: colors.white,
    fontSize: 24
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56 
  }
});