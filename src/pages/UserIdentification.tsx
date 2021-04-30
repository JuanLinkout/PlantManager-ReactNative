import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../components/Button';

import colors from '../style/colors';
import fonts from '../style/fonts';
import GlobalStyle from '../style/GlobalStyle';

import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function UserIdentification() {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  async function handleNavigation() {
    try {
      await AsyncStorage.setItem('@plantmanager:userName', name || '');
      navigation.navigate('Confirmation', {
        title: "Prontinho",
        subtitle: " Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
        buttonText: "Começar",
        nextScreen: "PlantSelect",
        emoji: "😄"
      });
    } catch (e) {
      Alert.alert(e);
    }
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name)
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.emoji} >
              { isFilled ? '😄' : ' 🤔' }
            </Text>

            <Text style={styles.title}>
              Como podemos {'\n'}
              chamar você?
            </Text>

            <TextInput 
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={[styles.input, (isFocused || isFilled) && { borderColor: colors.green }]}
              placeholder="Digite seu nome"
              onChangeText={handleInputChange}
            />

            <View style={styles.footer}>
              <Button disabled={!isFilled} onPress={handleNavigation} title="Confirmar" />
            </View>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.droidSafeArea,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 54
  },
  emoji: {
    fontSize: 44
  },
  title: {
    fontFamily:  fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    color: colors.heading,
    textAlign: 'center',
    marginTop: 20
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    textAlign: 'center',
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
});