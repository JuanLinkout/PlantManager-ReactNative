import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg'

import colors from '../style/colors';
import fonts from '../style/fonts';

interface PlantCardSecondary extends RectButtonProps {
  data: {
    name: string,
    photo: string,
    hour: string,
  };
  handleRemove: () => void;
}

export function PlantCardSecondary({ data, handleRemove }: PlantCardSecondary) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View style={styles.removeButtonContainer}>
            <RectButton
              style={styles.removeButton}
              onPress={handleRemove}
            >
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.containerButton} >

        <SvgFromUri width={70} height={70} uri={data.photo} />
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
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 26,
  },
  removeButtonContainer: {
    backgroundColor: colors.red,
    marginTop: 10,
    borderRadius: 20,
  },
  removeButton: {
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 100,
    height: 110,
    position: 'relative',
    right: 18,
    paddingRight: 20,

  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16,
    marginLeft: 16
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