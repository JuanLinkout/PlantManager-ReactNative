import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { WaterTip } from '../components/WaterTip';
import { deletePlant, getPlants, PlantProps } from '../libs/storage';
import colors from '../style/colors';
import fonts from '../style/fonts';
import GlobalStyle from '../style/GlobalStyle';

export function MyPlants() {

  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [nextWaterTime, setNextWaterTime] = useState<string>();
  const [loading, setLoading] = useState(true);

  async function loadPlants() {
    try {
      const plants = await getPlants();
      const nextTime = formatDistance(new Date(plants[0].dateTimeNotification).getTime(), new Date().getTime(), { locale: pt });

      setNextWaterTime(`Você deve regar sua ${plants[0].name} em ${nextTime}.`);
      setMyPlants(plants);
    } catch (e) {
      Alert.alert(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(plant: PlantProps) {
    Alert.alert('Remove', `Deseja remover ${plant.name}?`,[
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await deletePlant(plant);
            setMyPlants(oldPlants => {
              return oldPlants.filter(oldPlant => oldPlant.id !== plant.id);
            });
          } catch (e) {
            Alert.alert(e);
          }
        }
      }
    ])
  }

  useEffect(() => {
    loadPlants();
  },[]);

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <Header title="Minhas" subtitle="Plantinhas" />
      <View style={styles.waterTip}>
        <WaterTip tipDescription={nextWaterTime} />
      </View>
      <Text style={styles.title}>
        Próximas regadas
      </Text>
      <View style={styles.myPlants}>
        <FlatList 
          data={myPlants}
          keyExtractor={(plant) => String(plant.id)}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          renderItem={({item}) => (
            <PlantCardSecondary handleRemove={() => {handleDelete(item)}} data={item}/>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    ...GlobalStyle.droidSafeArea,
    backgroundColor: colors.background
  },
  waterTip: {
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    lineHeight: 32,
    color: colors.heading,
    marginTop: 40
  },
  myPlants: {
    flex: 1,
  }
});