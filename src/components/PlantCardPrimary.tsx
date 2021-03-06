import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'

import colors from '../style/colors';
import fonts from '../style/fonts';

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string,
    photo: string,
  }
}

export function PlantCardPrimary({ data, ...rest }: PlantCardPrimaryProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <SvgFromUri width={80} height={90} uri={data.photo} />
      <Text style={styles.text}>
        { data.name }
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16,
  }
});