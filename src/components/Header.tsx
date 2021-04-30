import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../style/colors';
import fonts from '../style/fonts';
import GlobalStyle from '../style/GlobalStyle';

import userImg from '../assets/juan.png';

interface HeaderProps {
  title: string,
  subtitle: string
}

export function Header({ title, subtitle }: HeaderProps) {


  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.title}>{ title }</Text>
        <Text style={styles.subtitle}>{ subtitle }</Text>
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
  subtitle: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.heading,
    fontWeight: 'bold',
    lineHeight: 40
  },
  title: {
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