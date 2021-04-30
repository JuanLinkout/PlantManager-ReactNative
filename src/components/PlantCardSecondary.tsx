import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'

import colors from '../style/colors';
import fonts from '../style/fonts';

interface PlantCardSecondary extends RectButtonProps {
  data: {
    name: string,
    photo: string,
    hour: string,
  }
}

export function PlantCardSecondary({ data, ...rest }: PlantCardSecondary) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <SvgFromUri width={60} height={60} uri={data.photo} />
      <Text style={styles.text}>
        { data.name }
      </Text>
      <View style={styles.details}>
        <Text style={styles.timeTip}>
          Regar ás
        </Text>
        <Text style={styles.timeLabel}>
          {data.hour}
        </Text>
      </View>

    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 26,
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  timeTip: {
    fontFamily: fonts.text,
    fontSize: 13,
    lineHeight: 20,
    color: colors.green
  },
  timeLabel: {
    fontFamily: fonts.heading,
    fontSize: 13,
    lineHeight: 20,
    color: colors.heading
  }
});