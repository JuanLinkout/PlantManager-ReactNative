import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import colors from '../style/colors';
import fonts from '../style/fonts';
import GlobalStyle from '../style/GlobalStyle';

import userImg from '../assets/juan.png';

export function Header() {
  
  
  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.subtitle}>Olá,</Text>
        <Text style={styles.title}>Juan</Text>
      </View>
      
      <Image style={styles.image} source={userImg} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.droidSafeArea,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.heading,
    fontWeight: 'bold',
    lineHeight: 40
  },
  subtitle: {
    fontFamily: fonts.complement,
    fontSize: 32,
    color: colors.heading
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  }
});