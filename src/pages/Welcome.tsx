import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';

import { Feather } from '@expo/vector-icons'

import wateringImg from '../assets/watering.png';
import colors from '../style/colors';
import GlobalStyle from '../style/GlobalStyle';
import fonts from '../style/fonts';

import { useNavigation } from '@react-navigation/core';

export function Welcome() {
  const navigation = useNavigation();
  
  function handleStart() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie{'\n'}
        suas plantas de{'\n'} 
        forma fácil
      </Text>

      <Image source={wateringImg} style={styles.image} resizeMode="contain" />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas 
        plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={handleStart}>
        <Feather name="chevron-right" style={styles.buttonIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.droidSafeArea,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.heading,
    paddingHorizontal: 18,
    fontFamily: fonts.text
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 28
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