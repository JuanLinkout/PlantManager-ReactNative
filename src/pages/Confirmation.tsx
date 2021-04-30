import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';

import colors from '../style/colors';
import fonts from '../style/fonts';
import GlobalStyle from '../style/GlobalStyle';

import { useNavigation, useRoute } from '@react-navigation/native';

interface ConfirmationParams {
  emoji: string;
  title: string;
  subtitle: string;
  buttonText: string;
  nextScreen: string;
}

export function Confirmation() {

  const route = useRoute();
  const confirmationParams = route.params as ConfirmationParams;
  const navigation = useNavigation();

  function handleMoveOn() {
    navigation.navigate(confirmationParams.nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>

            <Text style={styles.emoji} >
              {confirmationParams.emoji}
            </Text>

            <Text style={styles.title}>
              {confirmationParams.title}
            </Text>

            <Text style={styles.subtitle}>
              {confirmationParams.subtitle}
            </Text>

            <View style={styles.footer}>
              <Button onPress={handleMoveOn} title={confirmationParams.buttonText} />
            </View>

        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.droidSafeArea,
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 78
  },
  title: {
    fontFamily:  fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    color: colors.heading,
    textAlign: 'center',
    marginTop: 40
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: colors.heading
  },
  footer: {
    width: '100%',
    paddingHorizontal: 75,
    marginTop: 20
  }
});