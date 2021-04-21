import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../components/Button';
import colors from '../style/colors';
import fonts from '../style/fonts';
import GlobalStyle from '../style/GlobalStyle';

export function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>

            <Text style={styles.emoji} >
              😄
            </Text>

            <Text style={styles.title}>
              Prontinho
            </Text>

            <Text style={styles.subtitle}>
              Agora vamos começar a cuidar das suas
              platinhas com muito cuidado.
            </Text>

            <View style={styles.footer}>
              <Button title="Começar" />
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