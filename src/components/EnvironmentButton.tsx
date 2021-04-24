import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../style/colors';
import fonts from '../style/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string,
  active?: boolean
}

export function EnvironmentButton({ title, active = false, ...rest }: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[styles.rectButton, active && styles.rectButtonActive]}
      {...rest}
    >
      <Text style={[styles.text, active && styles.textActive]}>
        { title }
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  rectButton: {
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shape,
    borderRadius: 12,
    marginRight: 5
  },
  rectButtonActive: {
    color: colors.green,
    backgroundColor: colors.green_light
  },
  text: {
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 13,
    lineHeight: 23
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark
  }
});