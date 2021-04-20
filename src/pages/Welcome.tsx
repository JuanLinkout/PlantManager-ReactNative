import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, Image } from 'react-native';

import { Button } from '../components/Button';

import wateringImg from '../assets/watering.png';
import colors from '../style/colors';
import GlobalStyle from '../style/GlobalStyle';

export function Welcome() {
  const [visible, setVisible] = useState(false);

  function handleVisibility() {
    setVisible(!visible);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie{'\n'}
        suas plantas de{'\n'} 
        forma fácil
      </Text>
      {
        visible &&
        <Image source={wateringImg} />
      }

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas 
        plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <Button title=">" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.droidSafeArea,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.heading,
    paddingHorizontal: 20,
  },
  image: {
    width: 292,
    height: 284
  }
});