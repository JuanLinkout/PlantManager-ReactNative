import React, { useState } from 'react';
import { StyleSheet, View, Text, Platform, Alert, ScrollView } from 'react-native'
import { SvgFromUri } from 'react-native-svg';
import { Button } from '../components/Button';
import { PlantProps, savePlant } from '../libs/storage';
import { useNavigation } from '@react-navigation/native';

import waterDrop from '../assets/waterdrop.png';
import colors from '../style/colors';
import fonts from '../style/fonts';
import GlobalStyle from '../style/GlobalStyle';

import { useRoute } from '@react-navigation/core';
import DateTimePicker, { Event }  from '@react-native-community/datetimepicker' 

import { format, isBefore } from 'date-fns'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WaterTip } from '../components/WaterTip';

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

  const route = useRoute();
  const { plant } = route.params as Params;

  const navigation = useNavigation();

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS == 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePickerAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  async function handleSavePlant() {
    try {
      await savePlant({ ...plant, dateTimeNotification: selectedDateTime  });
      navigation.navigate('Confirmation', {
        title: "Tudo certo",
        subtitle: "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.",
        buttonText: "Muito Obrigado. :D",
        nextScreen: "MyPlants",
        emoji: "🤗"
      });
    } catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <ScrollView 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>

        <View style={styles.plantInfo}>

          <SvgFromUri
            uri={plant.photo}
            style={styles.svgImage}
          />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>

          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>

        </View>

        <View style={styles.controller}>
          <View style={styles.waterTip}>
            <WaterTip tipDescription={plant.water_tips} />
          </View>


          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {
            showDatePicker &&
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          }

          {
            Platform.OS == 'android' 
            ?  (<TouchableOpacity style={styles.dateTimePickerButton} onPress={handleOpenDateTimePickerAndroid}>
                  <Text style={styles.dateTimePicker}>
                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                  </Text>
                </TouchableOpacity>)
            : <></>
          }

          <Button
            title="Cadastrar planta"
            onPress={() => handleSavePlant()}
          />

        </View>
        
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    ...GlobalStyle.droidSafeArea,
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    // paddingVertical: 50,
    paddingTop: 20,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shape,
  },
  controller: {
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20, // getBottomSpace() Iphone-x-Helper
    backgroundColor: colors.white
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 10
  },
  svgImage: {

  },
  waterTip: {
    position: 'relative',
    bottom: 40
  },
  plantAbout: {
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 40
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.text,
    fontSize: 12,
    color: colors.heading,
    marginBottom: 5
  },
  dateTimePicker: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40
  }
});