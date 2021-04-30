import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import waterDrop from '../assets/waterdrop.png';
import colors from '../style/colors';
import fonts from '../style/fonts';

interface WaterTipProps {
  tipDescription: string,
}

export function WaterTip({tipDescription, ...rest}: WaterTipProps) {

  return (
    <View style={styles.tipContainer} {...rest}>
      <Image
        source={waterDrop}
        style={styles.tipImage}
      />

      <Text style={styles.tipDescription}>
        {tipDescription} 
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipDescription: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    fontSize: 14,
    color: colors.blue,
    textAlign: 'justify'
  },
});